import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";

import { BehaviorSubject, catchError, first, Observable, tap } from "rxjs";
import { ErrorHandlerService } from "./error-handler.service";

import { User } from "../models/User";



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url = "http://localhost:3000/auth"

  //il dollaro alla fine indica che è un observable
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  // @ts-ignore
  userId: number;
  //http option contenente che header vogliamo (json)
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  //passiamo un User a cui omettiamo l'id (il resto lo abbiamo, quello è autogenerato) quindi vogliamo mandarlo al server
  signup(user: Omit<User, "id">):Observable<User>{
    //post devo passare l'url di origine, cosa deve essere effettivamnte inviato e le http options, che contengono le indicazioni es. per l'header
    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(
      //prendi il primo risultato valido senza dovere fare unsubscribes
      first(),
      //gestisce l'errore e ritorna un user, se vogliamo un array di user e non uno singolo diventa handleError<User>("signup", [])
      catchError(this.errorHandlerService.handleError<User>("signup"))
    );
  }


//prendiamo da User email e password
  login(email: Pick<User,"email">, password: Pick<User, "password">):Observable<{token: string, userId : number}>{
    //post devo passare l'url di origine, cosa deve essere effettivamnte inviato e le http options, che contengono le indicazioni es. per l'header
    return this.http.post(`${this.url}/login`, { email,password }, this.httpOptions)
      .pipe(
        first(Object),
        tap((tokenObject:{ token: string, userId : number })=>{
          this.userId=tokenObject.userId;
          //salvo sul client il cookie
          localStorage.setItem("token", tokenObject.token);
          //possiamo settare l'observable a true senza dover passare per un http request
          this.isUserLoggedIn$.next(true);
          this.router.navigate(['posts'])
        }),
        catchError(this.errorHandlerService.handleError<{
          token: string;
          userId: number;
          }>("login")
        )
      );
  }
}
