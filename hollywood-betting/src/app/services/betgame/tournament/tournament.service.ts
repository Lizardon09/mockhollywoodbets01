import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {ITournament} from "./tournament";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private tournaments : string = "https://localhost:44376/api/tournament?";
  private sportidparam : string = "sportid=";
  private countryidparam : string = "countryid=";

  request : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { }

  getTournaments(sportid : number, countryid : number) : Observable<ITournament[]>{
    return this.http.get<ITournament[]>(this.tournaments + this.sportidparam + sportid + "&" + this.countryidparam + countryid);
  }

}
