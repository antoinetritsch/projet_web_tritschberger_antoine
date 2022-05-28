import { Component, Input, OnInit } from '@angular/core';
import {Address} from 'src/app/shared/models/address';
import { Select, Store } from '@ngxs/store';
import {
  DeleteAddress,
} from 'src/app/shared/actions/address.action'


@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css']
})
export class AddressItemComponent {
  @Input() address: Address = { country:'',city:'',additionnalInfo:'',zip_code:0,street:'',id:0};

  constructor(private store: Store) {
  }

  removeAddress(_address: Address) {
    this.store.dispatch(new DeleteAddress(_address));
  }
}
