import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ScrollStartDirective} from './directives/scroll-start.directive';
import {LayoutModule} from "./components/layout/layout.module";
import {HttpClientModule} from "@angular/common/http";
import {EditorModule} from "./components/customer/editor/editor.module";
import {ListviewModule} from "./components/customer/listview/listview.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    ScrollStartDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    EditorModule,
    ListviewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
