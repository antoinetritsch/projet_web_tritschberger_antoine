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
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Select(DataState.getProducts) products$!: Observable<ProductOwn[]>;

  product!:Product;
  error!: boolean;

  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private store: Store
  ) {
    var id = this.route.snapshot.params['id'];
    this.listService
      .getList()
      .subscribe((list: Product[]) => {
        const selectedProduct = list.find((product) => product.id === id);
        if (selectedProduct) {
          this.product = selectedProduct;
        } else {
          this.error = true;
        }
      });
  }

  AddToCart(){
    this.store.dispatch(new CreateProduct(this.product));
  }

}
