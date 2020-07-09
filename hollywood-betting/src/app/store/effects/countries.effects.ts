import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { CountryService} from '../../services/betgame/country/country.service';
import { ActionTypes } from '../actions/country.actions';
import * as Action from '../actions/country.actions';
import { ICountry } from '../../services/betgame/country/country';

@Injectable()
export class CountryEffects {

  
  @Effect()
  loadCountries$ = this.actions$.pipe(
    ofType(ActionTypes.GET_COUNTRIES),
    switchMap((action: Action.GetCountries) => 
      this.countryService.getCountryBySport(action.payload).pipe(
        map((countries: ICountry[]) => new Action.GetCountriesSuccess(countries))
      )
    )
  );
 
  constructor(
    private actions$: Actions,
    private countryService: CountryService
  ) {}
}