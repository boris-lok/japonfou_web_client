import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {EditorComponent as CustomerEditorComponent} from "./components/customer/editor/editor.component";
import {EditorComponent as ProductEditorComponent} from "./components/product/editor/editor.component";
import {ListviewComponent as CustomerListviewComponent} from "./components/customer/listview/listview.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: "full",
  }, {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {showSidebar: true}
  }, {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
  }, {
    path: 'customers/editor',
    component: CustomerEditorComponent,
    loadChildren: () => import('./components/customer/editor/editor.module').then(m => m.EditorModule),
  }, {
    path: 'customers/editor/:id',
    component: CustomerEditorComponent,
    loadChildren: () => import('./components/customer/editor/editor.module').then(m => m.EditorModule),
  }, {
    path: 'customers',
    component: CustomerListviewComponent,
    loadChildren: () => import('./components/customer/listview/listview.module').then(m => m.ListviewModule),
    data: {showSidebar: true}
  }, {
    path: 'products/editor',
    component: ProductEditorComponent,
    loadChildren: () => import('./components/product/editor/editor.module').then(m => m.EditorModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules,})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
