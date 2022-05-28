import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ListService } from 'src/app/services/list.service';

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
    private listService: ListService
  ) {
    this.searchbarForm = this.formBuilder.group({
      research: ['']
    });
  }

  updateList(list: Product[]) {
    this.setList.emit(list);
  }

  ngOnInit(): void {
    this.subscription = this.listService.getList().subscribe((list: Product[]) => {
      this.updateList(list);
    });
  }

  handleResearch(): void {
    this.subscription = this.listService.getList().subscribe((list: Product[]) => {
      if (this.searchbarForm.value.research) {
        list = list.filter((item: Product) => {
          return item.name
            .toLowerCase()
            .includes(this.searchbarForm.value.research.toLowerCase());
        });
      }
      this.updateList(list);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
