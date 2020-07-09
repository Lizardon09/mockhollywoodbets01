import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {ICountry} from './country';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countrybysporturl: string = "https://localhost:44376/api/sportcountry?";
  private sportidparam : string = "sportid=";

  request : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { }

  getCountryBySport(sportid : number) : Observable<ICountry[]>{
    return this.http.get<ICountry[]>(this.countrybysporturl+this.sportidparam+sportid)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse){
    console.log(error);
    return of([]);
  }

}
