import { Post } from "../models/post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    // copying the array values not the refrence
    // rxjs core dependency all about observables
    // or objects that help us pass data around
    return [...this.posts];
  }

  addPost(titlev: string, contentv: string) {
    const post: Post = {
      title: titlev,
      content: contentv
    };
    this.posts.push(post);
    // pushs a new value a copy emits posts
    this.postsUpdated.next([...this.posts]);
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}
