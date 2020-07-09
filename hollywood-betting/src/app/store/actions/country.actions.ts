import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ICountry } from '../../services/betgame/country/country';

export const GET_COUNTRIES     = '[COUNTRIES] Get'
export const GET_COUNTRIES_SUCCESS = '[COUNTRIES] Get Success'

export enum ActionTypes{
    GET_COUNTRIES     = '[COUNTRIES] Get',
    GET_COUNTRIES_SUCCESS = '[COUNTRIES] Get Success'
}

export class GetCountries implements Action {
    readonly type = ActionTypes.GET_COUNTRIES

    constructor(public payload: number) {}
}

export class GetCountriesSuccess implements Action{
    readonly type = ActionTypes.GET_COUNTRIES_SUCCESS

    constructor(public payload: ICountry[]) {}
}

export type ActionUnion = GetCountries | GetCountriesSuccess;