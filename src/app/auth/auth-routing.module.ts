import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginCompComponent } from "./login-comp/login-comp.component";
import { SignupCompComponent } from "./signup-comp/signup-comp.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginCompComponent
  },
  {
    path: "signup",
    component: SignupCompComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
