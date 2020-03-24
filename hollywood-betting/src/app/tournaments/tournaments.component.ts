import { Component, OnInit } from '@angular/core';
import {BetgamesService} from '../services/betgame/betgames.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, startWith, map} from 'rxjs/operators';
import { ITournament } from '../services/betgame/tournament';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  tournaments : ITournament[];

  constructor(private betgameservice : BetgamesService,
              private route : ActivatedRoute,
              private location : Location

  ) { }

  ngOnInit(): void {
    //this.getTournaments();
    this.route.params.subscribe(routeParams => {
      this.getTournaments();
    });
  }

  getTournaments(){
    const sportid = +this.route.snapshot.paramMap.get('sportid');
    const countryid = +this.route.snapshot.paramMap.get('countryid');
    this.betgameservice.getTournaments(sportid, countryid)
        .subscribe((data : any) => {this.tournaments=data;});
  }

}
