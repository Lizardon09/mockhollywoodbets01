import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {IBonus} from './bonus';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BonustableService {

  private bonustableurl : string = "/assets/data/bonustable.json";

  request : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { }

  getBonusTable() : Observable<IBonus[]>{
    return this.http.get<IBonus[]>(this.bonustableurl)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse){
    console.log(error);
    return of([]);
  }
}
