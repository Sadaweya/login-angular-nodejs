import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerService {

  handleError<T>(operation = "operation", result?: T) {
    // ci aspettiamo un errore di qualsiasi tipo e vogliamo ritornare un observable del tipo inviato
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`)
      //of rende il risultato un observable
      return of(result as T)
    };
  };
}

