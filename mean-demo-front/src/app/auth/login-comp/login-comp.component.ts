import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./../../services/auth.service";

@Component({
  selector: "app-login-comp",
  templateUrl: "./login-comp.component.html",
  styleUrls: ["./login-comp.component.css"]
})
export class LoginCompComponent implements OnInit, OnDestroy {
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

  onLogin(form: NgForm) {
    if (form.invalid) {
      console.log("form invalid");
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
