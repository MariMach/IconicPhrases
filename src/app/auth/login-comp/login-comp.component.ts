import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./../../services/auth.service";

@Component({
  selector: "app-login-comp",
  templateUrl: "./login-comp.component.html",
  styleUrls: ["./login-comp.component.css"]
})
export class LoginCompComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      console.log("form invalid");
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
