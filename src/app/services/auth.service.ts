import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthData } from "../models/auth-data.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(["/"]);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(emaild: string, passwordd: string) {
    const authData: AuthData = { email: emaild, password: passwordd };
    this.httpClient
      .post("http://localhost:3000/api/users/signup", authData)
      .subscribe(res => {
        console.log(res);
      });
  }

  login(emaild: string, passwordd: string) {
    const authData: AuthData = { email: emaild, password: passwordd };
    this.httpClient
      .post<{ token: string }>(
        "http://localhost:3000/api/users/login",
        authData
      )
      .subscribe(res => {
        if (res.token) {
          this.token = res.token;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(["/"]);
        }
      });
  }
}
