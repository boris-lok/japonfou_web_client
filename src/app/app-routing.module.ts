import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorComponent} from "./components/customer/editor/editor.component";

const routes: Routes = [
  {
    path: 'customer/editor',
    component: EditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
