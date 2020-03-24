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
  tournaments : ITournament[];
  sportid : number;
  tournamentassociation : ITournamentassociation;
  finaltournaments : any[] = [];

  // selectedcountries : ICountry[] = [];

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

  selectcountry(country : any){

    const selectedcountryindex =this.finaltournaments.indexOf(x=>x.country.id==country.id);

    // const selectedcountryindex = this.selectedcountries.indexOf(country);
    // console.log(selectedcountryindex);

    if(selectedcountryindex>=0){
      this.finaltournaments.splice(selectedcountryindex,1);
    }
    else{

      this.betgameservice.getTournaments(this.sportid, country.id)
      .subscribe((data : any) => {
        this.addTournaments(country,data);
      });

      // this.selectedcountries.push(country);
      // this.betgameservice.getTournaments(this.sportid, country.id)
      // .subscribe((data : any) => {this.tournaments.push(data);});
    }

    // console.log(this.selectedcountries);

    //console.log(this.finaltournaments);
    //this.router.navigateByUrl("tournaments/"+this.sportid+"/"+countryid)
  }

  // gettournaments(selectedcountry : any) : ITournament[]{
  //   return this.betgameservice.getTournaments(this.sportid, selectedcountry.id);
  // }

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
    //this.countries = this.betgameservice.getCountryBySport(id);
    //this.countries.subscribe(res => console.log(res));
  }
  
}
