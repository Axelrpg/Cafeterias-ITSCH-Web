import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCaf1Component } from './components/admin-caf1/admin-caf1.component';
import { AdminCaf2Component } from './components/admin-caf2/admin-caf2.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path: "",redirectTo: "login" ,pathMatch:"full"},
  {path: "login",component: LoginComponent},
  
  {path: "admin-caf1",component: AdminCaf1Component},
  {path: "admin-caf2",component: AdminCaf2Component},
  {path: "**",redirectTo: "login" ,pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
