import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isAuthenticated = this.userService.getIsAuth();
  }

  logout() {
    this.userService.logout();
    this.isAuthenticated = this.userService.getIsAuth();
  }

}
