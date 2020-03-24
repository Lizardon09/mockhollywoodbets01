import { Injectable } from '@angular/core';
import {IBetslipitem} from './betslipitem';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BetslipService {

  constructor() { }

  betslip = [];
  idcounter = 1;

  addBet(bet : any, type:string, player:string, condition:string, odds:number) : void{
    this.betslip.push(
      {
        id: this.idcounter,
        gametype: type,
        event: bet,
        subject: player,
        condition: condition,
        odds: odds
      }
    );
    this.idcounter++;
    console.log(this.betslip);
  }

  removeBet(bet : any) : void{
    this.betslip.splice(bet.id-1, 1);
    for(let i=bet.id-1; i<this.betslip.length; i++) {
      console.log(i);
      this.betslip[i].id = i+1;
    }
    this.idcounter--;
  }

  clearBets() : void{
    this.betslip = [];
    this.idcounter = 1;
  }

}
