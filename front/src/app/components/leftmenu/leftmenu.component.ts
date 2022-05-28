import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DataState } from 'src/app/shared/states/data_state';
import {Router,NavigationEnd ,NavigationStart,Event as NavigationEvent } from '@angular/router';
@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent {

  @Select(DataState.getProductsLength) productsLength$!: Observable<number>;

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
