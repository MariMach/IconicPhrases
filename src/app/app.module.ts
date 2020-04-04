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
  MatPaginatorModule,
  MatDialogModule
} from "@angular/material";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./post-list/post-list.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginCompComponent } from "./auth/login-comp/login-comp.component";
import { SignupCompComponent } from "./auth/signup-comp/signup-comp.component";
import { ErrorInterceptor } from "./services/error-interceptor";
import { ErrorCompComponent } from "./error-comp/error-comp.component";

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginCompComponent,
    SignupCompComponent,
    ErrorCompComponent
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
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorCompComponent]
})
export class AppModule {}
