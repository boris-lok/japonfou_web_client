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
  onResize = (event: any) => {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.closeSidebar();
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse = (): void => {
    this.collapsed = !this.collapsed;
    this.fireEvent();
  }

  closeSidebar = (): void => {
    this.collapsed = false;
    this.fireEvent();
  }

  fireEvent = () => {
    this.onToggleSidebar.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
