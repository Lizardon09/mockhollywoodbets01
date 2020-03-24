import { Component, OnInit } from '@angular/core';
import {BetgamesService} from '../services/betgame/betgames.service';
import { IBetgame } from '../services/betgame/betgame';
import { Observable, Subject, combineLatest } from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, startWith, map} from 'rxjs/operators';
import { ICountry } from '../services/betgame/country';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private betgamesservice : BetgamesService) { }

  arraySports:IBetgame[];
  games$:Observable<IBetgame[]>;
  filteredGames$:Observable<IBetgame[]>;
  filter: FormControl;
  filter$:Observable<string>;

  countries:Observable<ICountry[]>;

  ngOnInit(): void {
    this.sideNavSearch();
  }

  sideNavSearch()
  {
    this.games$ = this.betgamesservice.getGames();
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredGames$ = combineLatest(this.games$, this.filter$).pipe(
      map(([games, filterString]) => games.filter(movies => movies.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    );
  }

}
