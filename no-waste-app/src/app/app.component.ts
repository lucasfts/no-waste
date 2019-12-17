import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../assets/css/external-fonts.css'
    ]
})
export class AppComponent {
  title = 'no-waste-app';
  showHeader = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart){
        const url = event['url'];
        if (url == '/login' || url == '/register') {
          this.showHeader = false;
        }
        else{
          this.showHeader = true;
        }
      }
    });
  }

}
