import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  posts = [
    { title: "First Post", content: "This is the first post" },
    { title: "First Post", content: "This is the first post" },
    { title: "First Post", content: "This is the first post" },
    { title: "First Post", content: "This is the first post" },
    { title: "First Post", content: "This is the first post" },
    { title: "First Post", content: "This is the first post" }
  ];

  constructor() {}

  ngOnInit() {}
}
