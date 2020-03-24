import { Component, OnInit } from '@angular/core';
import {BetgamesService} from '../services/betgame/betgames.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, startWith, map} from 'rxjs/operators';
import { ICountry } from '../services/betgame/country';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { RouterModule, Routes , Router} from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: ICountry[];
  sportid : number;

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

  selectcountry(countryid : number){
    this.router.navigateByUrl("tournaments/"+this.sportid+"/"+countryid)
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
