import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {IBetgame} from './betgame';
import {ICountry} from './country';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BetgamesService {

  private gamesurl : string = "/assets/data/betgames.json"
  private gamesurl2: string = "https://localhost:44376/api/sport"
  private countrybysporturl: string = "https://localhost:44376/api/sportcountry"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) {}

  getGames() : Observable<IBetgame[]>{
    return this.http.get<IBetgame[]>(this.gamesurl2);
  }

  getCountryBySport(id : number) : Observable<ICountry[]>{
    return this.http.get<ICountry[]>(this.countrybysporturl+"/"+id);
  }

}
