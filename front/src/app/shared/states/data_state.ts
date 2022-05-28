import { Injectable } from '@angular/core';
import { NgxsModule, Action, Selector, State, StateContext } from '@ngxs/store';
import {
  CreateProduct,
  DeleteProduct,
  DeleteAllProduct,
} from 'src/app/shared/actions/product.action';
import { Product } from 'src/app/shared/models/product';
import { ProductOwn } from 'src/app/shared/models/product_own';
import { DataStateModel } from 'src/app/shared/states/data_state_model';
import { Address } from 'src/app/shared/models/address';
import {
  CreateAddress,
  DeleteAddress,
  DeleteAllAddress
} from 'src/app/shared/actions/address.action';

@State<DataStateModel>({
  name: 'data',
  defaults: {
    products: [],
    addresses:[]
  },
})

@Injectable()
export class DataState {

  @Selector()
  static getProducts(state: DataStateModel): ProductOwn[] {
    return state.products;
  }

  @Selector()
  static getProductsLength(state: DataStateModel): number {
    return state.products.length;
  }

  @Selector()
  static getAddressesLength(state: DataStateModel): number {
    return state.addresses.length;
  }

  @Selector()
  static getAddresses(state: DataStateModel): Address[] {
    return state.addresses;
  }

  @Selector()
  static getNextId(state: DataStateModel): number {
    var max:number;
    max=0;
    state.addresses.forEach(i=>{
      if(i.id>max){
        max=i.id;
      }
    });
    max++;
    return max;
  }


  getNextId(state: DataStateModel): number {
    var max:number;
    max=0;
    state.products.forEach(i=>{
      if(i.id>max){
        max=i.id;
      }
    });
    max++;
    return max;
    
  }


  @Action(CreateProduct)
  add(
    { getState, patchState }: StateContext<DataStateModel>,
    { payload }: CreateProduct
  ) {
    const state = getState();
    var po = new ProductOwn();
    po.product=payload;
    po.id=this.getNextId(state);
    patchState({
      products: [...state.products, po],
    });
  }

  @Action(DeleteProduct)
  remove(
    { getState, patchState }: StateContext<DataStateModel>,
    { payload }: DeleteProduct
  ) {
    const state = getState();

    patchState({
      products: state.products.filter((product) => product.id !== payload.id),
    });
  }


  @Action(DeleteAllProduct)
  removeAll({ getState, patchState }: StateContext<DataStateModel>) {
    const state = getState();

    patchState({
      products: [],
    });
  }


  @Action(CreateAddress)
  addAddress(
    { getState, patchState }: StateContext<DataStateModel>,
    { payload }: CreateAddress
  ) {
    const state = getState();
    patchState({
      addresses: [...state.addresses, payload],
    });
  
  }

  @Action(DeleteAddress)
  removeAddress(
    { getState, patchState }: StateContext<DataStateModel>,
    { payload }: DeleteAddress
  ) {
    const state = getState();

    patchState({
      addresses: state.addresses.filter((address) => address.id !== payload.id),
    });
  }

  @Action(DeleteAllAddress)
  removeAllAddress({ getState, patchState }: StateContext<DataStateModel>) {
    const state = getState();

    patchState({
      addresses: [],
    });
  }

}
