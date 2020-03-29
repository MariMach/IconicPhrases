import { Post } from "./../models/post.model";
import { PostsService } from "./../services/posts.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  private mode = "create";
  private postId: string;
  post: Post;
  isLoading = false;
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        //
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postdata => {
          //
          this.isLoading = false;
          this.post = {
            id: postdata._id,
            title: postdata.title,
            content: postdata.content
          };
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  OnSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
