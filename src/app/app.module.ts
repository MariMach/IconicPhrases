import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { AngularMaterialModule } from "./angular-material.module";
import { AuthInterceptor } from "./services/auth-interceptor";
import { AppRoutingModule } from "./routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./services/error-interceptor";
import { ErrorCompComponent } from "./error-comp/error-comp.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent, ErrorCompComponent],
  imports: [
    BrowserModule,
    PostsModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorCompComponent]
})
export class AppModule {}
