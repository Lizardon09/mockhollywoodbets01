import {IEvent} from './event';
import {IMarket} from '../market/market';

export interface IEventMarket{
    event : IEvent;
    markets : IMarket[];
}