import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    './header.component.css'
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userListener: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isAuthenticated = this.userService.getIsAuth();
    this.userListener = this.userService.getUserListener()
      .subscribe(isAuth => {
        this.isAuthenticated = isAuth;
      });
  }

  logout() {
    this.userService.logout();
    this.isAuthenticated = this.userService.getIsAuth();
  }

  ngOnDestroy(): void {
    this.userListener.unsubscribe();
  }

}
