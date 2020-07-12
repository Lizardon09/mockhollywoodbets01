import { Injectable } from '@angular/core';
import {IBetslipitem} from './betslipitem';
import { Observable, of } from 'rxjs';
import { BonustableService } from '../betgame/bonustable/bonustable.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { IStatus } from './status';
import { IBetslipinfo } from './betslipinfo';
import { IBetslip } from './betslip';
import { IBet } from './bet';

@Injectable({
  providedIn: 'root'
})
export class BetslipService {

  private beturl: string = "https://localhost:44376/api/bet?";

  request : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private bonustableservice : BonustableService,private http : HttpClient) {
    this.getBonusTable();
    this.waitForOneSecond().then((value)=>{});
   }

  betslip = [];
  idcounter = 1;
  multipleodds = 1;
  bonus = 0;
  bonustable = [];
  finalodds = 0;
  bonusindex = 0;
  multiplestake = 0;
  multiplepayout = 0;
  betslipinfo : IBetslipinfo = {betslip:null, bets : []};
  slip : IBetslip = {id:0, totalstake:0, totalpayout:0, finalodds:0, accountid:0};
  bet : IBet;

  addBet(bet : any) : void{
    this.multiplestake = 0;
    this.multiplepayout = 0;
    if(!this.betslip.find(x => x.event==bet.event)){
      bet.id = this.idcounter;
      this.betslip.push(bet);
      this.idcounter++;
      //console.log(this.betslip);
      this.calculateMultiple();
    }
  }

  removeBet(bet : any) : void{
    this.multiplestake = 0;
    this.multiplepayout = 0;
    this.betslip.splice(bet.id-1, 1);
    for(let i=bet.id-1; i<this.betslip.length; i++) {
      //console.log(i);
      this.betslip[i].id = i+1;
    }
    this.idcounter--;
    this.calculateMultiple();
  }

  clearBets() : void{
    this.betslip = [];
    this.idcounter = 1;
    this.calculateMultiple();
  }

  calculatePayoutForStake(stake : number, odds : number, betId : number){
    this.betslip[betId-1].stake = stake;
    this.betslip[betId-1].payout = (stake * odds).toFixed(2);
  }

  calculateStakeForPayout(payout : number, odds : number, betId : number){
    this.betslip[betId-1].stake = (Math.round((payout/odds)*100)/100).toFixed(2);
    this.betslip[betId-1].payout = payout;
  }

  calculateMultiplePayoutForStake(stake : number, odds : number){
    this.multiplestake = stake;
    this.multiplepayout = Number((stake * odds).toFixed(2));
  }

  calculateMultipleStakeForPayout(payout : number, odds : number){
    this.multiplestake = Number((Math.round((payout/odds)*100)/100).toFixed(2));
    this.multiplepayout = payout;
  }

  calculateMultiple(){

    if(this.betslip.length==0){
      this.multipleodds = 1;
    }

    else if(this.betslip.length==1){
      this.multipleodds = this.betslip[0].odds;
    }

    else{
      this.bonusindex = this.bonustable.findIndex((bonus) => bonus.legs >= this.betslip.length);
      this.bonus = this.bonustable[this.bonusindex].bonus;
      this.multipleodds = 1;

      for(let i=0; i<this.betslip.length; i++){
        this.multipleodds *= this.betslip[i].odds+1;
      }

      this.multipleodds -= 1;
      this.multipleodds = Number(this.multipleodds.toFixed(2));
    }

    this.finalodds = Number((this.multipleodds + (this.multipleodds*(this.bonus/100))).toFixed(2));

  }

  getBonusTable() : any{
    this.bonustableservice.getBonusTable().subscribe((data)=>{this.bonustable=data;return data;});
  }

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 300);
    });
  }

  bookSingleBet(accountid : number, betid : number) : Observable<IStatus[]>{

    if(this.betslip[betid-1].stake<=0 || this.betslip[betid-1].payout<=0){
      return of([{status:"Empty"}]);
    }

    this.betslipinfo.bets = [];
    this.slip.totalstake = Number(this.betslip[betid-1].stake);
    this.slip.totalpayout = Number(this.betslip[betid-1].payout);
    this.slip.finalodds = this.betslip[betid-1].odds;
    this.slip.accountid = accountid;

    this.betslipinfo.betslip = this.slip;

    this.bet = {
      id : this.betslip[betid-1].id,
      marketid : this.betslip[betid-1].market.marketId,
      sportid : this.betslip[betid-1].sportype.id,
      odds : this.betslip[betid-1].odds,
      tournamentid : this.betslip[betid-1].tournament.id,
      date : this.betslip[betid-1].date,
      eventid : this.betslip[betid-1].event.id,
      bettypeid : this.betslip[betid-1].bettype.id,
      stake: Number(this.betslip[betid-1].stake),
      payout: Number(this.betslip[betid-1].payout)
    }
    
    this.betslipinfo.bets.push(this.bet);

    return this.postBets(this.betslipinfo);

  }

  bookMultipleBet(accountid : number) : Observable<IStatus[]> {

    if(this.multiplestake<=0 || this.multiplepayout<=0){
      return of([{status:"Empty"}]);
    }

    this.betslipinfo.bets = [];
    this.slip.totalstake = Number(this.multiplestake);
    this.slip.totalpayout = Number(this.multiplepayout);
    this.slip.finalodds = this.finalodds;
    this.slip.accountid = accountid;

    this.betslipinfo.betslip = this.slip;

    for(let i=0; i<this.betslip.length; i++){

      this.bet = {
        id : this.betslip[i].id,
        marketid : this.betslip[i].market.marketId,
        sportid : this.betslip[i].sportype.id,
        odds : this.betslip[i].odds,
        tournamentid : this.betslip[i].tournament.id,
        date : this.betslip[i].date,
        eventid : this.betslip[i].event.id,
        bettypeid : this.betslip[i].bettype.id,
        stake: 0,
        payout: 0
      }

      this.betslipinfo.bets.push(this.bet);
    }

    return this.postBets(this.betslipinfo);

  }

  postBets(betslipinfo : any) : Observable<IStatus[]>{
    console.log(betslipinfo);
    return this.http.post<IStatus[]>(this.beturl, betslipinfo)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse){
    console.log(error);
    return of([{status:"Error"}]);
  }

}
