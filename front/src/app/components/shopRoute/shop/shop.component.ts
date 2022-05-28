import { Component, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent{
  products: Product[] = [];

  setList(list : Product[]){
    this.products=list;
  }
}
