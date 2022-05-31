import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CreateAddress,
  DeleteAddress
} from 'src/app/shared/actions/address.action'
import { Address } from 'src/app/shared/models/address';
import { DataState } from 'src/app/shared/states/data_state';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  @Select(DataState.getAddresses) addresses$!: Observable<Address[]>;
  @Select(DataState.getAddressesLength)
  addressesLength$!: Observable<number>;
  @Select(DataState.getNextId) nextId$!: Observable<number>;

  countries: string[] = [
    'France',
    'Allemagne',
    'Royaume-Uni',
    'Espagne',
    'Italie',
    'Autriche',
    'Belgique',
    'Corée',
  ];

  addressesForm: any;

  constructor(private formBuilder: FormBuilder,private store: Store) {
    this.addressesForm = this.formBuilder.group({
      street: ['', Validators.required],
      zip_code: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      additionnalInfo : ['',Validators.nullValidator],
    });
  }

  handleSubmit(): void {
    const addr = new Address();
      addr.street = this.addressesForm.value.street;
      addr.zip_code = this.addressesForm.value.zip_code;
      addr.city = this.addressesForm.value.city;
      addr.country = this.addressesForm.value.country;
      addr.additionnalInfo = this.addressesForm.value.additionnalInfo;
      const subscription = this.nextId$.subscribe((id: number) => {
        addr.id = id;
      });
      this.addAddress(addr);
      subscription.unsubscribe();
  }

  addAddress(_address: Address) {
    this.store.dispatch(new CreateAddress(_address));
  }

 
}
