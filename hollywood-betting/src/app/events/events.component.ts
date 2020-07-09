import { Component, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest, empty } from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, startWith, map} from 'rxjs/operators';
import { IEvent } from '../services/betgame/event/event';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {IBettype } from '../services/betgame/bettype/bettype';
import {EventService} from '../services/betgame/event/event.service';
import {BettypeService} from '../services/betgame/bettype/bettype.service';
import {MarketService} from '../services/betgame/market/market.service';
import { IMarket } from '../services/betgame/market/market';
import { IEventMarket } from '../services/betgame/event/eventmarket';
import { IDateEvent } from '../services/betgame/event/dateevent';
import {BetslipService} from '../services/betslip/betslip.service';
import {IBetslipitem} from '../services/betslip/betslipitem';
import { IBetgame } from '../services/betgame/sport/betgame';
import { ITournament } from '../services/betgame/tournament/tournament';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events : IEvent[];
  eventgroups : any[] = [];
  bettypes : IBettype[];
  tournamentname : string;
  selectedbettype : IBettype = {id : -1, name : "default"};
  markets : IMarket[];
  //marketsbybettype : IMarket[];
  eventmarkets : IEventMarket[];
  tempeventmarket : IEventMarket;
  dateevents : IDateEvent[] = [];    
  dateevent : IDateEvent = {date: null, eventmarket:[]};
  sentBet : IBetslipitem = {id:-1, market:null, sportype:null, odds:0, tournament:null, date:null, event:null, bettype:null, stake:0, payout:0};
  sporType : IBetgame = {id:-1, name:"", logo:""};
  tournament : ITournament = {id:-1,name:""};

  constructor(private route : ActivatedRoute,
    private location : Location,
    private eventservice : EventService,
    private bettypeservice : BettypeService,
    private marketservice : MarketService,
    private betslipservice : BetslipService
  ) { }

  ngOnInit(): void {
    //this.getTournaments();
    this.route.params.subscribe(routeParams => {
      this.getEvents();
      this.getBettypes();
      this.waitForOneSecond().then((value)=>this.getMarkets());
      //this.getMarkets();
    });
  }

  getEvents(){

    this.sporType.id = +this.route.snapshot.paramMap.get('sportid');
    this.sporType.name = this.route.snapshot.paramMap.get('sportname');

    const tournamentid = +this.route.snapshot.paramMap.get('tournamentid');
    this.tournamentname = this.route.snapshot.paramMap.get('tournamentname');

    this.tournament.id = tournamentid;
    this.tournament.name = this.tournamentname;

    return this.eventservice.getEvents(tournamentid)
        .subscribe((data : any) => {this.events=data;this.getEventGroups(data);});

  }

  getBettypes(){
    const tournamentid = +this.route.snapshot.paramMap.get('tournamentid');
    this.tournamentname = this.route.snapshot.paramMap.get('tournamentname');

    return this.bettypeservice.getBettypes(tournamentid)
    .subscribe((data : any) => {this.bettypes=data;this.selectedbettype=data[0]});

  }

  getMarkets(){
    const tournamentid = +this.route.snapshot.paramMap.get('tournamentid');
    
    return this.marketservice.getMarketByTournament(tournamentid)
    .subscribe((data : any) => {this.markets=data;this.assignMarketsToEvent(data);this.getTableBreaks();})
  }

  getEventGroups(data : any){

    var temp = Array<IEventMarket>();

    for(let i = 0; i < data.length; i++){

      this.tempeventmarket = {event:data[i],markets:[]};
      temp.push(this.tempeventmarket);

    }

    this.eventmarkets = temp;
    this.eventmarkets.sort((a,b) => a.event.date < b.event.date ? -1 : a.event.date > b.event.date ? 1 : 0);

  }

  compareDate(date1 : Date, date2 : Date) : boolean{
    if(
      date1.getDate()==date2.getDate() && 
      date1.getMonth()==date2.getMonth() && 
      date1.getFullYear()==date2.getFullYear()){
        return true;
      }
    return false;
  }

  selectBettype(bettype : IBettype){
    this.selectedbettype = bettype;
    //this.getMarketsByBettype();
  }

  assignMarketsToEvent(data : any){

    for(let i=0; i<data.length; i++){
      this.eventmarkets.forEach(function(eventmarket){
        if(eventmarket.event.id==data[i].eventId){
          eventmarket.markets.push(data[i]);
        }
      })
    }

  }

  getTableBreaks(){
    
    this.dateevent.date = this.eventmarkets[0].event.date;
    this.dateevent.eventmarket.push(this.eventmarkets[0]);

    if(this.eventmarkets.length<=1){
      this.dateevents.push(this.dateevent);
      return;
    }

    for(let i=1; i<this.eventmarkets.length; i++){

      // if(i==0){
      //   this.dateevent.date = this.eventmarkets[i].event.date;
      //   this.dateevent.eventmarket.push(this.eventmarkets[i]);
      // }

      if(this.compareDate(new Date(this.eventmarkets[i-1].event.date), new Date(this.eventmarkets[i].event.date))){
        this.dateevent.eventmarket.push(this.eventmarkets[i]);
      }

      else{
        this.dateevents.push(this.dateevent);
        this.dateevent = {date: null, eventmarket:[]};
        this.dateevent.date = this.eventmarkets[i].event.date;
        this.dateevent.eventmarket = [];
        this.dateevent.eventmarket.push(this.eventmarkets[i]);
      }

      if(i+1==this.eventmarkets.length){
        this.dateevents.push(this.dateevent);
      }

    }

  }

  addToBetslip(market : IMarket, event : IEvent){
    this.sentBet = {

      id:0,
      market : market,
      sportype : this.sporType,
      odds : market.odds,
      tournament : this.tournament,
      date : event.date,
      event : event,
      bettype : this.selectedbettype,
      stake : 0,
      payout : 0
    }

    this.betslipservice.addBet(this.sentBet);

  }

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 300);
    });
  }

}
