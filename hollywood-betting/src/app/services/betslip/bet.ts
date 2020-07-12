export interface IBet{
    id : number;
    marketid : number;
    sportid : number;
    odds : number;
    tournamentid : number;
    date : Date;
    eventid : number;
    bettypeid : number;
    stake: number;
    payout: number;
}