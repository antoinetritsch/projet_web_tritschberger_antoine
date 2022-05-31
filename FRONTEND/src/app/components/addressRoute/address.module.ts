import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address/address.component';

const routes: Routes = [
  { path: 'addresses', component: AddressComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AddressModule {}
