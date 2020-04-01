import { SignupCompComponent } from "./auth/signup-comp/signup-comp.component";
import { LoginCompComponent } from "./auth/login-comp/login-comp.component";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: PostListComponent
  },
  {
    path: "create",
    component: PostCreateComponent
  },
  {
    path: "edit/:postId",
    component: PostCreateComponent
  },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
