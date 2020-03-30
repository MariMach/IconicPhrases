import { Post } from "./../models/post.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PostsService } from "../services/posts.service";
import { PageEvent } from "@angular/material";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    // fetching all the posts
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { postCount: number; posts: Post[] }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
      });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangedPage(pagedata: PageEvent) {
    // pageData object contains length, pageIndex, pageSize, previousPageIndex
    this.isLoading = true;
    this.currentPage = pagedata.pageIndex + 1;
    this.postsPerPage = pagedata.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}
