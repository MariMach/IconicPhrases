import { SignupCompComponent } from "./signup-comp/signup-comp.component";
import { LoginCompComponent } from "./login-comp/login-comp.component";
import { AngularMaterialModule } from "./../angular-material.module";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// AngularMaterialModule is a sared Module

@NgModule({
  declarations: [LoginCompComponent, SignupCompComponent],
  imports: [CommonModule, FormsModule, AngularMaterialModule]
})
export class AuthModule {}
