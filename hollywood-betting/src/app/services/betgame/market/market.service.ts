import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {IMarket} from './market';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private marketurl: string = "https://localhost:44376/api/market?";
  private tournamentidparam : string = "tournamentid=";

  request : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { }

  getMarketByTournament(tournamentid : number) : Observable<IMarket[]>{
    return this.http.get<IMarket[]>(this.marketurl + this.tournamentidparam + tournamentid);
  }

}
