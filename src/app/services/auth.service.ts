import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AuthData } from "../models/auth-data.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private userId: string;

  constructor(private httpClient: HttpClient, private router: Router) {}

  private saveAuthData(token: string, expiresInDuration: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiresInDuration", expiresInDuration.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearData() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiresInDuration");
  }

  private getAuthData() {
    const mytoken = localStorage.getItem("token");
    const myexpiresInDuration = localStorage.getItem("expiresInDuration");
    const myuserId = localStorage.getItem("userId");
    if (!mytoken || !myexpiresInDuration) {
      return;
    }
    return {
      token: mytoken,
      expiresInDuration: new Date(myexpiresInDuration),
      userId: myuserId
    };
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn =
      authInformation.expiresInDuration.getTime() - now.getTime();
    if (expiresIn > 0) {
      console.log(authInformation.token + " " + expiresIn);
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log("Setting time: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearData();
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
      .post<{ token: string; expiresIn: number; userId: string }>(
        "http://localhost:3000/api/users/login",
        authData
      )
      .subscribe(res => {
        if (res.token) {
          this.token = res.token;
          this.userId = res.userId;
          const expiresInDuration = +res.expiresIn;
          this.setAuthTimer(expiresInDuration);
          const now = new Date();
          const expiresInDurationSt = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(this.token, expiresInDurationSt, this.userId);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(["/"]);
        }
      });
  }
}
