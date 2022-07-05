import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {EditorComponent} from "./components/customer/editor/editor.component";

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
    path: 'customers', children: [
      {
        path: 'editor',
        component: EditorComponent,
        loadChildren: () => import('./components/customer/editor/editor.module').then(m => m.EditorModule),
      }
    ],
    data: {showSidebar: true}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules,})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
