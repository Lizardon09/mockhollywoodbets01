import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {IBetgame} from './betgame';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  private gamesurl : string = "/assets/data/betgames.json";
  private sports: string = "https://localhost:44376/api/sport";

  request : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { }

  getGames() : Observable<IBetgame[]>{
    return this.http.get<IBetgame[]>(this.sports);
  }

}
