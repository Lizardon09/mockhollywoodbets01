import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {IBettype} from './bettype';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BettypeService {

  private tournamentidparam : string = "tournamentid=";
  private bettypes : string = "https://localhost:44376/api/bettype?";

  request : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) {}

  getBettypes(tournamentid : number) : Observable<IBettype[]>{
    return this.http.get<IBettype[]>(this.bettypes + this.tournamentidparam + tournamentid)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
    console.log(error);
    return of([]);
  }

}
