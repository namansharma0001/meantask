import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms'

import {Authentication} from '../authentication';

declare var $: any;

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {
  loginMessage: string
  timeOut: number = 1800

  public loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
    email:    ["",Validators.required]
  })

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public auth: Authentication,
  ){}

  ngOnInit() {

  }

  signUp(event: any) {
    event.preventDefault()
    this.loginMessage = 'Please wait'
    var formData = this.loginForm.value
    this.auth.register(formData.username, formData.password,formData.email)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/posts'])
        },
        (error) => {
          console.log(error);
          if(error.status==401) {
            this.loginForm.reset()
            this.loginMessage = 'Please recheck your inputs'
           setTimeout(() => {
            this.loginMessage = null
            }, this.timeOut)
          } else {
            this.loginMessage = 'Please check your connection'
           setTimeout(() => {
            this.loginMessage = null
            }, this.timeOut)
          }
        }
      );
  }
}
