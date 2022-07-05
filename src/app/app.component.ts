import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

interface SidebarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showSidebar: boolean = true;
  isSidebarCollapsed: boolean = false;
  screenWidth: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router
      .events
      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          this.showSidebar = this.activatedRoute.firstChild?.snapshot.data['showSidebar'] ?? false;
        }
      });
  }

  onToggleSidebar = (data: SidebarToggle): void => {
    this.isSidebarCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
}
