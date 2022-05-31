import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApiHttpInterceptor } from '../../../api/api-httpinterceptor';
import { Router, NavigationEnd, NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signinForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private intercept: ApiHttpInterceptor,
    private router: Router
  ) {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleSubmit(): void {
    if (this.signinForm.dirty && this.signinForm.valid) {
      this.authenticationService
        .signin(this.signinForm.value.username, this.signinForm.value.password)
        .subscribe((flux) => {
          if (flux) {
            this.router.navigate(['/product/shop']);
          }
        });
    } else {
      // Toggle errors
      Object.keys(this.signinForm.controls).forEach((field) => {
        const control = this.signinForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
