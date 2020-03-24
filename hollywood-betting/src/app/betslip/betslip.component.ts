import { Component, OnInit } from '@angular/core';
import {BetslipService} from '../services/betslip/betslip.service';

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.css']
})
export class BetslipComponent implements OnInit {

  betslipitems = [];
  default = true;
  numberofbets = 0;

  constructor(
    private betsliptservice : BetslipService
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(){
    this.betslipitems = this.betsliptservice.betslip;
    this.numberofbets = this.betslipitems.length;
    if(this.betslipitems.length>0){
      this.default = false;
    }
    else{
      this.default = true;
    }
  }

  removeBet(bet : any): void{
    this.betsliptservice.removeBet(bet);
  }

  clearBets() : void{
    this.betsliptservice.clearBets();
  }

}
