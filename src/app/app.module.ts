import { AuthInterceptor } from "./services/auth-interceptor";
import { AppRoutingModule } from "./routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { PostCreateComponent } from "./post-create/post-create.component";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatSliderModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule
} from "@angular/material";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./post-list/post-list.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginCompComponent } from "./auth/login-comp/login-comp.component";
import { SignupCompComponent } from "./auth/signup-comp/signup-comp.component";

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginCompComponent,
    SignupCompComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSliderModule,
    MatExpansionModule,
    HttpClientModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
