import { SignupCompComponent } from "./auth/signup-comp/signup-comp.component";
import { LoginCompComponent } from "./auth/login-comp/login-comp.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: PostListComponent
  },
  {
    path: "create",
    component: PostCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit/:postId",
    component: PostCreateComponent,
    canActivate: [AuthGuard]
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
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
