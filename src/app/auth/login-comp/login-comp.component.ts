import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login-comp",
  templateUrl: "./login-comp.component.html",
  styleUrls: ["./login-comp.component.css"]
})
export class LoginCompComponent implements OnInit {
  isLoading = false;

  constructor() {}

  onLogin(form: NgForm) {
    console.log(form.value);
  }

  ngOnInit() {}
}
