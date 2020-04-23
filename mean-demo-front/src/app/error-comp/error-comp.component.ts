import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-error-comp",
  templateUrl: "./error-comp.component.html",
  styleUrls: ["./error-comp.component.css"]
})
export class ErrorCompComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

  ngOnInit() {}
}
