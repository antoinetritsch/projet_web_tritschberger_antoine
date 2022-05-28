import { Component, Input, OnInit } from '@angular/core';
import {
  DeleteProduct
} from 'src/app/shared/actions/product.action'
import { Select, Store } from '@ngxs/store';
import { ProductOwn } from 'src/app/shared/models/product_own';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() product !:ProductOwn;
  constructor(private store: Store) {}

  removeFromCart() {
    this.store.dispatch(new DeleteProduct(this.product));
  }

}
