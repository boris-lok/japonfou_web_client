import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHeader: boolean = false;
  showSideNav: boolean = false;
  showFooter: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router
      .events
      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          this.showHeader = this.activatedRoute.firstChild?.snapshot.data['showHeader'] ?? false;
          this.showSideNav = this.activatedRoute.firstChild?.snapshot.data['showSideNav'] ?? false;
          this.showFooter = this.activatedRoute.firstChild?.snapshot.data['showFooter'] ?? false;
        }
      });
  }
}
