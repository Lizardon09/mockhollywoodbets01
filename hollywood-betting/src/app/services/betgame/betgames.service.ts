import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {IBetgame} from './betgame';
import {ICountry} from './country';
import {ITournament} from "./tournament";
import {IEvent} from './event';
import {IBettype} from './bettype';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BetgamesService {

  private gamesurl : string = "/assets/data/betgames.json";
  private sports: string = "https://localhost:44376/api/sport";
  private countrybysporturl: string = "https://localhost:44376/api/sportcountry?";
  private tournaments : string = "https://localhost:44376/api/tournament?";
  private sportidparam : string = "sportid=";
  private countryidparam : string = "countryid=";
  private eventsurl : string = "https://localhost:44376/api/event?";
  private tournamentidparam : string = "tournamentid=";
  private bettypes : string = "https://localhost:44376/api/bettype?";

  request : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) {}

  getGames() : Observable<IBetgame[]>{
    return this.http.get<IBetgame[]>(this.sports);
  }

  getCountryBySport(sportid : number) : Observable<ICountry[]>{
    return this.http.get<ICountry[]>(this.countrybysporturl+this.sportidparam+sportid);
  }

  getTournaments(sportid : number, countryid : number) : Observable<ITournament[]>{
    return this.http.get<ITournament[]>(this.tournaments + this.sportidparam + sportid + "&" + this.countryidparam + countryid);
  }

  getEvents(tournamentid : number) : Observable<IEvent[]>{
    return this.http.get<IEvent[]>(this.eventsurl + this.tournamentidparam + tournamentid);
  }

  getBettypes(tournamentid : number) : Observable<IBettype[]>{
    return this.http.get<IBettype[]>(this.bettypes + this.tournamentidparam + tournamentid);
  }

}
