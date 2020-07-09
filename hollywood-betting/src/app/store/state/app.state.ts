import { ICountry } from '../../services/betgame/country/country';

export interface AppState{
    readonly countries: ICountry[];
}