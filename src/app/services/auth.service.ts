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
  constructor(private httpClient: HttpClient, private router: Router) {}

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
      .post("http://localhost:3000/api/users/login", authData)
      .subscribe(res => {
        console.log(res);
      });
  }
}
