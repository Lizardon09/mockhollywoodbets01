import { Component, OnInit } from '@angular/core';
import {BetslipService} from '../services/betslip/betslip.service';
import { IBonus } from '../services/betgame/bonustable/bonus';
import { BonustableService } from '../services/betgame/bonustable/bonustable.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.css']
})
export class BetslipComponent implements OnInit {

  betslipitems = [];
  bonustable = [];
  default = true;
  numberofbets = 0;
  bonus = 0;
  nextbonus : IBonus = {legs:0, bonus:0};
  multipleodds = 0;
  finalodds = 0;
  multiplestake = 0;
  multiplepayout = 0;

  constructor(
    private betsliptservice : BetslipService
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(){
    this.multiplestake = this.betsliptservice.multiplestake;
    this.multiplepayout = this.betsliptservice.multiplepayout;
    this.bonustable = this.betsliptservice.bonustable;
    this.betslipitems = this.betsliptservice.betslip;
    this.numberofbets = this.betslipitems.length;
    if(this.betslipitems.length>0){
      this.default = false;
    }
    else{
      this.default = true;
    }

    this.bonus = this.betsliptservice.bonus;
    this.multipleodds = this.betsliptservice.multipleodds;
    this.finalodds = this.betsliptservice.finalodds;

    if(this.betsliptservice.bonusindex+1>=this.bonustable.length){
      this.nextbonus = this.bonustable[this.bonustable.length-1];
    }

    else{
      this.nextbonus = this.bonustable[this.betsliptservice.bonusindex + 1];
    }

  }

  removeBet(bet : any): void{
    this.betsliptservice.removeBet(bet);
  }

  clearBets() : void{
    this.betsliptservice.clearBets();
  }

  calculatePayoutForStake(stake : number, odds : number, betId : number){
    this.betsliptservice.calculatePayoutForStake(stake,odds,betId);
  }

  calculateStakeForPayout(payout : number, odds : number, betId : number){
    this.betsliptservice.calculateStakeForPayout(payout,odds,betId);
  }

  calculateMultiplePayoutForStake(stake : number){
    this.betsliptservice.calculateMultiplePayoutForStake(stake, this.finalodds);
  }

  calculateMultipleStakeForPayout(payout : number){
    this.betsliptservice.calculateMultipleStakeForPayout(payout, this.finalodds);
  }

}
