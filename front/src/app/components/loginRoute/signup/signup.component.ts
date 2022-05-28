import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import User from '../../../shared/models/User';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user : User = new User("","",0,"","",0,"","","","","");
  @Output() data = new EventEmitter<User>();

  constructor() { 
  }

  ngOnInit(): void { 
  }

  onClick(): void{
    if(this.user.IsCorrect()==''){
      this.data.emit(this.user);
    }
  }
}