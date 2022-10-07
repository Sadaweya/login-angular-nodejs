import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

//aggiunge il token all'header per permettere l'autenticazione, di base l'header finora è application/json
export class AuthInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    console.log("client: services.auth-interceptor: prendo il token\n" +token);
    if(token){
      console.log("client: services.auth-interceptor: ho il token\n" +token);

      const clonedRequest=req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      })
      console.log("client: services.auth-interceptor: headers della req\n" +clonedRequest.headers.get("Authorization"));

      return next.handle(clonedRequest);
    } else {
      console.log("client: services.auth-interceptor: non ho il token\n");

      return next.handle(req);
    }
  }
}
