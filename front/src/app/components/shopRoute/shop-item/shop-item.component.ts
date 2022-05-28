import { Component, OnInit,Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductOwn } from 'src/app/shared/models/product_own';
import { DataState } from 'src/app/shared/states/data_state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import {
  CreateProduct,
  DeleteProduct
} from 'src/app/shared/actions/product.action';


@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent {
  @Select(DataState.getProducts) products$!: Observable<ProductOwn[]>;
  @Input() product!:Product;

  constructor(private store: Store) {}

  AddToCart(){
    this.store.dispatch(new CreateProduct(this.product));
  }

}
