import { Subscription } from "rxjs";
import { AuthService } from "./../../services/auth.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-signup-comp",
  templateUrl: "./signup-comp.component.html",
  styleUrls: ["./signup-comp.component.css"]
})
export class SignupCompComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authServiceSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authServiceSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.authServiceSub.unsubscribe();
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      console.log("form invalid");
      return;
    }
    if (form.value.password !== form.value.passwordconf) {
      console.log("passwords does not much");
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }
}
