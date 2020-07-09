import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {ISoccer} from './soccer';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SoccerService {

  private gamesurl : string = "/assets/data/soccer.json";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { }

  getSoccer() : Observable<ISoccer[]>{
    return this.http.get<ISoccer[]>(this.gamesurl)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse){
    console.log(error);
    return of([]);
  }
}
