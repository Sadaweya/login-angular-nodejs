import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

import {first} from "rxjs";

import { Post } from "../../models/Post"
import { AuthService } from "../../services/auth.service";
import { PostService } from "../../services/post.service";



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  //importo formDirective
  // @ts-ignore
  @ViewChild("formDirective") formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter<any>();

  // @ts-ignore
  postForm: FormGroup;

  isOpen = false;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.postForm = this.createFromGroup();
  }

  createFromGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(5)]),
      body: new FormControl("", [Validators.required, Validators.minLength(10)]),
    });
  }

  onSubmit(formData: Pick<Post,"title"|"body">):void{
    this.postService.createPost(formData,this.authService.userId).pipe(
      first()).subscribe(()=>{
      //quando clicchiamo post quest farà pertire l'evento in modo tale che le informazioni del child faranno triggerare l'evento "create"
        this.create.emit(null);
      })

    // ecco come resettare tutto il post dopo il submit
    this.postForm.reset();
    this.formDirective.resetForm();
  }

}
