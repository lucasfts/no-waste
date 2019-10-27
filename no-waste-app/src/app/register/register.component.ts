import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    '../login/login.component.css',
    './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    const user: User = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    };
    this.userService.createUser(user);
  }

}
