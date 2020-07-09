import { Action } from '@ngrx/store'
import { ICountry } from '../../services/betgame/country/country'
import * as CountryActions from './../actions/country.actions'
import { isNgTemplate } from '@angular/compiler';
import { title } from 'process';

export const initialState : ICountry = {
    id:0,
    name:"default",
    logo:"default"
}

export function reducer(state: ICountry[] = [initialState], action: CountryActions.ActionUnion) {

    // Section 3
    switch(action.type) {
        
        case CountryActions.GET_COUNTRIES_SUCCESS:
            console.log("Successful call made to api and recieved as payload:", action.payload);
            return action.payload;
            
        default:
            return state;
            
    }
}