import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router,NavigationEnd ,NavigationStart,Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
 currentRoute!:string;
 
  constructor(private router: Router) {
    this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if(event instanceof NavigationStart) {
                this.currentRoute=event.url;
              }
            });
  }
}
