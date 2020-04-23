import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "./../angular-material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// AngularMaterialModule is a sared Module

@NgModule({
  declarations: [PostListComponent, PostCreateComponent],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class PostsModule {}
