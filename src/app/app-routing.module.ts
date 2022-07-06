import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {EditorComponent} from "./components/customer/editor/editor.component";
import {ListviewComponent} from "./components/customer/listview/listview.component";

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
    component: EditorComponent,
    loadChildren: () => import('./components/customer/editor/editor.module').then(m => m.EditorModule),
  }, {
    path: 'customers/editor/:id',
    component: EditorComponent,
    loadChildren: () => import('./components/customer/editor/editor.module').then(m => m.EditorModule),
  }, {
    path: 'customers',
    component: ListviewComponent,
    loadChildren: () => import('./components/customer/listview/listview.module').then(m => m.ListviewModule),
    data: {showSidebar: true}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules,})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
