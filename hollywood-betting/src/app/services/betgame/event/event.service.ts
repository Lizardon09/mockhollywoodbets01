import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {IEvent} from './event';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsurl : string = "https://localhost:44376/api/event?";
  private tournamentidparam : string = "tournamentid=";

  request : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) {}

  getEvents(tournamentid : number) : Observable<IEvent[]>{
    return this.http.get<IEvent[]>(this.eventsurl + this.tournamentidparam + tournamentid)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse){
    console.log(error);
    return of([]);
  }

}
