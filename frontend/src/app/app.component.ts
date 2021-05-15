import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'bobo-care';
  public showFooter = false;

  constructor(private router: Router) {
    this.router.events.forEach((event) => {
      console.log(event);
      if (event instanceof NavigationStart) {
        this.showFooter = event['url'] != '/sign-in';
      }
    });
  }
}
