import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  @Output() setList = new EventEmitter();

  searchbarForm: FormGroup;
  subscription: Subscription | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.searchbarForm = this.formBuilder.group({
      research: ['']
    });
  }

  updateList(list: Product[]) {
    this.setList.emit(list);
  }

  reset(){
    this.subscription = this.productService.All().subscribe((list: Product[]) => {
      this.updateList(list);
    });
  }

  ngOnInit(): void {
    this.reset();
  }

  handleResearch(): void {
    if (this.searchbarForm.value.research && this.searchbarForm.value.research.length >= 3) {
      this.subscription = this.productService.Filter(this.searchbarForm.value.research).subscribe((list: Product[]) => {
        this.updateList(list);
      });
    }
    else if(this.searchbarForm.value.research==null || this.searchbarForm.value.research.length ==0){
      this.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
