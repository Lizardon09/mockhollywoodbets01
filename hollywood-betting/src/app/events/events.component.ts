import { Component, OnInit } from '@angular/core';
import {BetgamesService} from '../services/betgame/betgames.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, startWith, map} from 'rxjs/operators';
import { IEvent } from '../services/betgame/event';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events : IEvent[];
  tournamentname : string;

  constructor(private betgameservice : BetgamesService,
    private route : ActivatedRoute,
    private location : Location

  ) { }

  ngOnInit(): void {
    //this.getTournaments();
    this.route.params.subscribe(routeParams => {
      this.getEvents();
    });
  }

  getEvents(){
    const tournamentid = +this.route.snapshot.paramMap.get('tournamentid');
    this.tournamentname = this.route.snapshot.paramMap.get('tournamentname');
    this.betgameservice.getEvents(tournamentid)
        .subscribe((data : any) => {this.events=data;});
  }

}
