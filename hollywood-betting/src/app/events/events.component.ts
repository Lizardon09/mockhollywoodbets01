import { Component, OnInit } from '@angular/core';
import {BetgamesService} from '../services/betgame/betgames.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, startWith, map} from 'rxjs/operators';
import { IEvent } from '../services/betgame/event';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { IBettype } from '../services/betgame/bettype';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events : IEvent[];
  bettypes : IBettype[];
  tournamentname : string;
  selectedbettype : IBettype;

  constructor(private betgameservice : BetgamesService,
    private route : ActivatedRoute,
    private location : Location

  ) { }

  ngOnInit(): void {
    //this.getTournaments();
    this.route.params.subscribe(routeParams => {
      this.getEvents();
      this.getBettypes();
    });
  }

  getEvents(){
    const tournamentid = +this.route.snapshot.paramMap.get('tournamentid');
    this.tournamentname = this.route.snapshot.paramMap.get('tournamentname');

    return this.betgameservice.getEvents(tournamentid)
        .subscribe((data : any) => {this.events=data;});

  }

  getBettypes(){
    const tournamentid = +this.route.snapshot.paramMap.get('tournamentid');
    this.tournamentname = this.route.snapshot.paramMap.get('tournamentname');

    return this.betgameservice.getBettypes(tournamentid)
    .subscribe((data : any) => {this.bettypes=data;this.selectedbettype=data[0]});

  }

  selectBettype(bettype : IBettype){
    this.selectedbettype = bettype;
  }

}
