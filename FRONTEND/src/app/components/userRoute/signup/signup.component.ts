import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import User from '../../../shared/models/User';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User("", "", "", "", 0, "", "", "", "", "");


  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,private router: Router) {
  }

  ngOnInit(): void {
  }

  onClick(): void {
    if (this.user.IsCorrect() == '') {
      this.authenticationService.signup(this.user)
        .subscribe((flux) => {
          if (flux) {
            this.router.navigate(['/user/signin']);
          }
        });
    }
  }
}