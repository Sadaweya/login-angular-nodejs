import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostsComponent } from './components/posts/posts.component';
import { AuthGuard } from "./services/auth-guard.service";


const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "posts", component: PostsComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent },
  { path: "**", redirectTo: ""  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
