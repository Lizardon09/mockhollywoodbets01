import {ITournament} from './tournament';
import {ICountry} from './country';

export interface ITournamentassociation{
    sportid : number;
    country : ICountry;
    tournaments : ITournament[];
}