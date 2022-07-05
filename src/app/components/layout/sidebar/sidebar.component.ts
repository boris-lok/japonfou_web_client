import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {navbarData} from "./nav-data";
import {faClose, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";

interface SidebarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {

  collapsed: boolean = false;
  screenWidth: number = 0;
  navData = navbarData;
  menuIcon = faEllipsisVertical;
  closeIcon = faClose;

  @Output() onToggleSidebar: EventEmitter<SidebarToggle> = new EventEmitter();

  constructor() {
  }

  @HostListener('window:resize', ['$event'])
  onResize = (_: any) => {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
    }
    this.changeToggleSidebar(this.collapsed, this.screenWidth, true);
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse = (fireEvent: boolean = false): void => {
    this.changeToggleSidebar(!this.collapsed, this.screenWidth, fireEvent);
  }

  closeSidebar = (fireEvent: boolean = false): void => {
    this.changeToggleSidebar(false, this.screenWidth, fireEvent);
  }

  private changeToggleSidebar = (collapsed: boolean, screenWidth: number, fireEvent: boolean) => {
    this.screenWidth = screenWidth;
    this.collapsed = collapsed;
    if (fireEvent) {
      this.onToggleSidebar.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
}
