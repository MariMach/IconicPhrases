import { HttpClient } from "@angular/common/http";
import { Post } from "../models/post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getPosts() {
    // copying the array values not the refrence
    // rxjs core dependency all about observables
    // or objects that help us pass data around
    // return [...this.posts];
    this.httpClient
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
      .pipe(
        map(postData => {
          return postData.posts.map(doc => {
            return {
              id: doc._id,
              title: doc.title,
              content: doc.content
            };
          });
        })
      )
      .subscribe(tposts => {
        this.posts = tposts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.httpClient
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const afterDeleting = this.posts.filter(post => post.id !== postId);
        this.posts = afterDeleting;
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
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/api/posts",
        post
      )
      .subscribe(resData => {
        console.log(resData.message);
        post.id = resData.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.httpClient.get<{ _id: string; title: string; content: string }>(
      "http://localhost:3000/api/posts/" + id
    );
  }

  updatePost(postid: string, posttitle: string, postcontent: string) {
    const post: Post = { id: postid, title: posttitle, content: postcontent };
    // send request to the backend
    this.httpClient
      .put("http://localhost:3000/api/posts/" + postid, post)
      .subscribe(result => {
        const updPosts = [...this.posts];
        const oldPostIndex = updPosts.findIndex(p => p.id === post.id);
        updPosts[oldPostIndex] = post;
        this.posts = updPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }
}
