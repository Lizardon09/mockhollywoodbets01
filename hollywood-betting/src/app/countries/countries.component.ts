import { Component, OnInit } from '@angular/core';
import {BetgamesService} from '../services/betgame/betgames.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, startWith, map} from 'rxjs/operators';
import { ICountry } from '../services/betgame/country';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { RouterModule, Routes , Router} from '@angular/router';
import { ITournament } from '../services/betgame/tournament';
import {ITournamentassociation} from '../services/betgame/tournamentassociation';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: ICountry[];
  sportid : number;
  tournamentassociation : ITournamentassociation;
  finaltournaments : any[] = [];

  constructor(private betgameservice : BetgamesService,
              private route : ActivatedRoute,
              private location: Location,
              private router : Router
              ) { }

  ngOnInit(): void {
    //this.getCountryBySport();
    this.route.params.subscribe(routeParams => {
      this.getCountryBySport();
    });
  }

  selectcountry(selectedcountry : ICountry){

    for(let i=0; i<this.finaltournaments.length; i++){
      if(this.finaltournaments[i].country.id==selectedcountry.id){
        this.finaltournaments.splice(i,1);
        return;
      }
    }

    this.betgameservice.getTournaments(this.sportid, selectedcountry.id)
    .subscribe((data : any) => {
      this.addTournaments(selectedcountry,data);
    });

  }

  addTournaments(country : ICountry, tournament:ITournament[]){

      this.tournamentassociation = {
        sportid : this.sportid,
        country : country,
        tournaments : tournament
      }
      this.finaltournaments.push(this.tournamentassociation);

  }

  getCountryBySport()
  {
    this.sportid = +this.route.snapshot.paramMap.get('id');
    this.betgameservice.getCountryBySport(this.sportid)
        .subscribe((data : any) => {this.countries=data;});
  }
  
}
