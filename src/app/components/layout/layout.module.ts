import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {SidebarComponent} from './sidebar/sidebar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    FontAwesomeModule,
    MatDividerModule
  ],
  exports: [
    SidebarComponent,
  ]
})
export class LayoutModule {
}
