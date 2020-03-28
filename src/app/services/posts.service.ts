import { HttpClient } from "@angular/common/http";
import { Post } from "../models/post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    // copying the array values not the refrence
    // rxjs core dependency all about observables
    // or objects that help us pass data around
    // return [...this.posts];
    this.httpClient
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  addPost(titlev: string, contentv: string) {
    const post: Post = {
      id: null,
      title: titlev,
      content: contentv
    };
    this.httpClient
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe(resData => {
        console.log(resData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}
