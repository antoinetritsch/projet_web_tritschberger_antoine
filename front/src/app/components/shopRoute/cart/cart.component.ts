import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  DeleteAllProduct
} from 'src/app/shared/actions/product.action'
import { ProductOwn } from 'src/app/shared/models/product_own';
import { DataState } from 'src/app/shared/states/data_state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Select(DataState.getProducts) products$!: Observable<ProductOwn[]>;
  @Select(DataState.getProductsLength) productsLength$!: Observable<number>;


  constructor(private store: Store) {}
  
  DeleteAll(){
    this.store.dispatch(new DeleteAllProduct());
  }
}
