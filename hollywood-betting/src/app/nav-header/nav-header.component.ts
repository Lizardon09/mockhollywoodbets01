import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {

  today : number = Date.now();

  constructor() {
    setInterval(() => {this.today = Date.now()}, 1);
   }

  ngOnInit(): void {
  }

}
