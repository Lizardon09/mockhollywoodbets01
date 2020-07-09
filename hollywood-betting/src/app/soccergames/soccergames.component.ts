import { Component, OnInit } from '@angular/core';
import {SoccerService} from '../services/soccer/soccer.service';
import {ISoccer} from '../services/soccer/soccer';
import {BetslipService} from '../services/betslip/betslip.service';
import { Observable, Subject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-soccergames',
  templateUrl: './soccergames.component.html',
  styleUrls: ['./soccergames.component.css']
})
export class SoccergamesComponent implements OnInit {

  constructor(
    private soccerservice : SoccerService,
    private betslipservice : BetslipService
    ) { }

  soccer = [];

  ngOnInit(): void {
    this.soccerservice.getSoccer()
    .subscribe(soccergames => this.soccer=soccergames);
  }

  // addBet(bet:ISoccer, player:string, condition:string, odds:number) : void{
  //   this.betslipservice.addBet(bet, "soccer", player, condition, odds);
  // }

}
