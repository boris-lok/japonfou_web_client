import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ScrollStartDirective} from './directives/scroll-start.directive';
import {LayoutModule} from "./components/layout/layout.module";
import {HttpClientModule} from "@angular/common/http";
import {EditorModule as CustomerEditorModule} from "./components/customer/editor/editor.module";
import {EditorModule as ProductEditorModule} from "./components/product/editor/editor.module";
import {ListviewModule as CustomerListviewModule} from "./components/customer/listview/listview.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

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
    CustomerEditorModule,
    ProductEditorModule,
    CustomerListviewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHome,
    )
  }
}
