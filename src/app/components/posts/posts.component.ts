import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

import { Post } from "../../models/Post";
import { PostService } from "../../services/post.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  // @ts-ignore
  posts$: Observable<Post[]>;
  // @ts-ignore
  userId: number;//Pick<User, "id">;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.fetchAll();
    this.userId = this.authService.userId;
    console.log(`post generati per user id: ${this.userId}`);

    console.log(this.posts$.forEach((post)=>{console.log("post: "+post)}));

  }

  fetchAll(): Observable<Post[]>{
    console.log(`post.component.fetchAll()`);
    return this.postService.fetchAll();
  }

  createPost():void{
    console.log(`post.component.createPost()`);
    this.posts$ = this.fetchAll();
  }

  delete(postId: number):void{
    console.log(`post.component.delete()  postId: ${postId}`);
    this.postService.deletePost(postId).subscribe(()=>this.posts$ = this.fetchAll());
  }

}
