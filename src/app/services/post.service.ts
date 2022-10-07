import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ErrorHandlerService } from "./error-handler.service";
import { Observable, catchError, first, pipe } from "rxjs";

import { Post } from "../models/Post";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private url = "http://localhost:3000/post";  //qui potrebbe essere post

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
    ) { }

  fetchAll():Observable<Post[]>{
    console.log(`post service stò caricando i post`);

    return this.http
      .get<Post[]>(this.url, { responseType:"json" })
        .pipe(
         catchError(this.errorHandlerService.handleError<Post[]>("fetchAll", []))
        );
  }

  createPost(formData: Partial<Post>, userId: number ): Observable<Post>{
    return this.http
      .post<Post>(this.url, {title: formData.title, body: formData.body, user: userId}, this.httpOptions)
      .pipe(
        catchError(this.errorHandlerService.handleError<Post>("createPost"))
      );
  }

  deletePost(postId: number):Observable<{}>{
    return this.http.delete(`${this.url}/${postId}`,this.httpOptions).pipe(
      first(),//per essere sicuri che fuzioni solo sul primo risultato
      catchError(this.errorHandlerService.handleError<Post>("deletePost"))
    )
  }

}
