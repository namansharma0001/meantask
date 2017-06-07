import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms'

import {Authentication} from './authentication';

declare var $: any;

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
  loginMessage: string
  timeOut: number = 1800

  public loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  })

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public auth: Authentication,
  ){}

  ngOnInit() {

  }
  goToSignUp(){
    this.router.navigate(['/register'])
  }
  loginUser(event: any) {
    event.preventDefault()
    this.loginMessage = 'Please wait'
    var formData = this.loginForm.value
    this.auth.login(formData.username, formData.password)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/posts'])
        },
        (error) => {
            console.log(error);
        }
      );
  }
}
