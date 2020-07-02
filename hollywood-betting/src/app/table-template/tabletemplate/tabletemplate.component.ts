import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IEventMarket } from '../../services/betgame/event/eventmarket';
import { IDateEvent } from '../../services/betgame/event/dateevent';
import { IBettype } from '../../services/betgame/bettype/bettype';

@Component({
  selector: 'app-tabletemplate',
  templateUrl: './tabletemplate.component.html',
  styleUrls: ['./tabletemplate.component.css']
})

export class TabletemplateComponent implements OnInit {

  @Input() events: IEventMarket[] = [];
  @Input() bettype: IBettype;
  dateevents : IDateEvent[];    
  dateevent : IDateEvent;
  
  keys: string[];    
  
  ngOnChanges() {
    this.keys = Object.keys(this.events[0]);
  }

  constructor() { }

  ngOnInit(): void {
    this.getTableBreaks();
  }

  getTableBreaks(){

    console.log(this.bettype);
    
    if(this.events.length<=1){
      this.dateevent.date = this.events[0].event.date;
      this.dateevent.eventmarket.push(this.events[0]);
      this.dateevents.push(this.dateevent);
      return;
    }

    for(let i=0; i<this.events.length; i++){

      if(i=0){
        this.dateevent.date = this.events[i].event.date;
        this.dateevent.eventmarket.push(this.events[i]);
      }

      else if(this.compareDate(new Date(this.events[i-1].event.date), new Date(this.events[i].event.date))){
        this.dateevent.eventmarket.push(this.events[i]);
      }

      else{
        this.dateevents.push(this.dateevent);
        this.dateevent.date = this.events[i].event.date;
        this.dateevent.eventmarket = [];
        this.dateevent.eventmarket.push(this.events[i]);
      }

      if(i+1==this.events.length){
        this.dateevents.push(this.dateevent);
      }

    }

  }

  compareDate(date1 : Date, date2 : Date) : boolean{
    if(
      date1.getDate()==date2.getDate() && 
      date1.getMonth()==date2.getMonth() && 
      date1.getFullYear()==date2.getFullYear()){
        return true;
      }
    return false;
  }

}
