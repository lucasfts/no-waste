import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe(user => {
        this.user = user;
      }, error => {

      });
    console.log(this.user);
  }

}
