import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddressItemComponent } from './components/addressRoute/address-item/address-item.component';
import { AddressComponent } from './components/addressRoute/address/address.component';
import { CartComponent } from './components/shopRoute/cart/cart.component';
import { SearchbarComponent } from './components/shopRoute/searchbar/searchbar.component';
import { ProductDetailComponent } from 'src/app/components/shopRoute/product-detail/product-detail.component';
import { ShopComponent } from './components/shopRoute/shop/shop.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import {DataState} from 'src/app/shared/states/data_state';
import { HomeComponent } from './components/home/home.component';
import { LeftmenuComponent } from './components/leftmenu/leftmenu.component';
import { ShopItemComponent } from './components/shopRoute/shop-item/shop-item.component';
import { CartItemComponent } from './components/shopRoute/cart-item/cart-item.component';
import { SigninComponent } from './components/loginRoute/signin/signin.component';
import { SignupComponent } from './components/loginRoute/signup/signup.component';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import {AuthGuard} from './services/auth-gard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/loginRoute/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'address',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/addressRoute/address.module').then(
        (m) => m.AddressModule
      ),
  },
  {
    path: 'product',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/shopRoute/shop.module').then(
        (m) => m.ShopModule
      ),
  },
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AddressItemComponent,
    AddressComponent,
    CartComponent,
    SearchbarComponent,
    ProductDetailComponent,
    ShopComponent,
    HomeComponent,
    LeftmenuComponent,
    ShopItemComponent,
    CartItemComponent,
    SigninComponent,
    SignupComponent,
    PhoneNumberPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxsModule.forRoot([DataState]),
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
