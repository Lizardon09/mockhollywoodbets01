import {IMarket} from '../betgame/market/market';
import {IBetgame} from '../betgame/sport/betgame';
import {ITournament} from '../betgame/tournament/tournament';
import {IEvent} from '../betgame/event/event';
import { IBettype } from '../betgame/bettype/bettype';

export interface IBetslipitem{
    id : number;
    market : IMarket;
    sportype : IBetgame;
    odds : number;
    tournament : ITournament;
    date : Date;
    event: IEvent;
    bettype: IBettype;
    stake: number;
    payout: number;
}