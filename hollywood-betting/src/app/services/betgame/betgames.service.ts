import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {IBetgame} from './betgame';
import {ICountry} from './country';
import {ITournament} from "./tournament";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BetgamesService {

  private gamesurl : string = "/assets/data/betgames.json"
  private sports: string = "https://localhost:44376/api/sport"
  private countrybysporturl: string = "https://localhost:44376/api/sportcountry?"
  private tournaments : string = "https://localhost:44376/api/tournament?"
  private tournamentsport : string = "sportid="
  private tournamentcountry : string = "countryid="

  request : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) {}

  getGames() : Observable<IBetgame[]>{
    return this.http.get<IBetgame[]>(this.sports);
  }

  getCountryBySport(sportid : number) : Observable<ICountry[]>{
    return this.http.get<ICountry[]>(this.countrybysporturl+this.tournamentsport+sportid);
  }

  getTournaments(sportid : number, countryid : number) : Observable<ITournament[]>{
    return this.http.get<ITournament[]>(this.tournaments + this.tournamentsport + sportid + "&" + this.tournamentcountry + countryid);
  }

}
