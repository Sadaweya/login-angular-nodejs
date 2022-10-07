import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";

import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  //qui ho dovuto fare ts ignore perchè non lo vuole undefined
  // @ts-ignore
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm= this.createFromGroup();
  }

  //form group viene passato dall'html, prendo gli input e li controllo con i validators
  createFromGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)]),
    });
  }

  signup():void{
    //console.log("signup success"+ this.signupForm.value)
     // prendo il valore dalla form fatta precedentemente
    this.authService.signup(this.signupForm.value)
      //confermo la ricezione a console
      .subscribe((msg)=>(console.log(msg)))
    this.router.navigate(["login"]);
  }
}
