import { HttpClient } from "@angular/common/http";
import { Post } from "../models/post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ postCount: number; posts: Post[] }>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    // copying the array values not the refrence
    // rxjs core dependency all about observables
    // or objects that help us pass data around
    // return [...this.posts];
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.httpClient
      .get<{ message: string; posts: any; maxPosts: number }>(
        "http://localhost:3000/api/posts" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(doc => {
              return {
                id: doc._id,
                title: doc.title,
                content: doc.content,
                imagePath: doc.imagePath,
                creator: doc.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(tpostsData => {
        this.posts = tpostsData.posts;
        this.postsUpdated.next({
          postCount: tpostsData.maxPosts,
          posts: [...this.posts]
        });
      });
  }

  deletePost(postId: string) {
    return this.httpClient.delete("http://localhost:3000/api/posts/" + postId);
  }

  addPost(titlev: string, contentv: string, image: File) {
    const postData = new FormData();
    postData.append("title", titlev);
    postData.append("content", contentv);
    postData.append("image", image, titlev);

    this.httpClient
      .post<{ message: string; post: Post }>(
        "http://localhost:3000/api/posts",
        postData
      )
      .subscribe(resData => {
        this.router.navigate(["/"]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.httpClient.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>("http://localhost:3000/api/posts/" + id);
  }

  updatePost(
    postid: string,
    posttitle: string,
    postcontent: string,
    image: File | string
  ) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", postid);
      postData.append("title", posttitle);
      postData.append("content", postcontent);
      postData.append("image", image, posttitle);
    } else {
      postData = {
        id: postid,
        title: posttitle,
        content: postcontent,
        imagePath: image,
        creator: null
      };
    }

    // send request to the backend
    this.httpClient
      .put("http://localhost:3000/api/posts/" + postid, postData)
      .subscribe(result => {
        this.router.navigate(["/"]);
      });
  }
}
