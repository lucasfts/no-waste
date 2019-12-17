import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/services/user/user.service';
import { Login } from 'src/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    const userLogin: Login = {
      email: form.value.email,
      password: form.value.password
    };
    this.userService.login(userLogin);
  }

}
