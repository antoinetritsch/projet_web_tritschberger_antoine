import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UserModule {}
