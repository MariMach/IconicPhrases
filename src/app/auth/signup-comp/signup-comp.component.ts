import { AuthService } from "./../../services/auth.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-signup-comp",
  templateUrl: "./signup-comp.component.html",
  styleUrls: ["./signup-comp.component.css"]
})
export class SignupCompComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      console.log("form invalid");
      return;
    }
    if (form.value.password !== form.value.passwordconf) {
      console.log("passwords does not much");
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }
}
