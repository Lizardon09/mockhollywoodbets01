import { Component, OnInit } from '@angular/core';
import { IBetgame } from '../services/betgame/sport/betgame';
import { Observable, Subject, combineLatest } from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, startWith, map} from 'rxjs/operators';
import { ICountry } from '../services/betgame/country/country';
import { RouterModule, Routes , Router} from '@angular/router';
import {SportService} from '../services/betgame/sport/sport.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private router : Router,
              private sportservice : SportService
    ) { }

  arraySports:IBetgame[];
  games$:Observable<IBetgame[]>;
  filteredGames$:Observable<IBetgame[]>;
  filter: FormControl;
  filter$:Observable<string>;

  ngOnInit(): void {
    this.sideNavSearch();
  }

  sideNavSearch()
  {
    this.games$ = this.sportservice.getGames();
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredGames$ = combineLatest(this.games$, this.filter$).pipe(
      map(([games, filterString]) => games.filter(movies => movies.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    );
  }

}
