import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorComponent} from "./components/customer/editor/editor.component";
import {ListviewComponent} from "./components/customer/listview/listview.component";

const routes: Routes = [
  {
    path: 'customer/editor',
    component: EditorComponent
  },
  {
    path: 'customers',
    component: ListviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
