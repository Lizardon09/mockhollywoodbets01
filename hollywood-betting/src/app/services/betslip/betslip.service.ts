import { Injectable } from '@angular/core';
import {IBetslipitem} from './betslipitem';
import { Observable, of } from 'rxjs';
import { BonustableService } from '../betgame/bonustable/bonustable.service';

@Injectable({
  providedIn: 'root'
})
export class BetslipService {

  constructor(private bonustableservice : BonustableService) {
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

}
