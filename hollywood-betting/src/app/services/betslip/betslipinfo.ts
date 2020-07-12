import {IBetslip} from './betslip';
import {IBetslipitem} from './betslipitem';
import {IBet} from './bet';

export interface IBetslipinfo{
    betslip : IBetslip;
    bets : IBet[];
}