import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import {Http, Headers, Response, URLSearchParams } from '@angular/http'
import 'rxjs/Rx'
import { Md5 } from 'ts-md5/dist/md5'

import { environment } from '../../environments/environment'

@Injectable()
export class Authentication {
  bar_name: any;
  barId: any;
  url: string;

  constructor(private http: Http, private router: Router) {

    if (environment.production) {
      this.url = `api/`
    } else {
      this.url = `http://localhost:3000/api/`
    }
  }

  login(username: string, password: string) {
    console.log(username);
    console.log(password);
    // let passwordMd5 = Md5.hashStr(password)
    return this.http.post(this.url+`login`, JSON.stringify({
        username: username,
        password: password
      }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .map((response : Response) => {
        let data = response.json();
        console.log(data);
        let user = data.user
        localStorage.setItem('userEmail', user.email);
      },
      error =>{
        if(error){
          alert(error);
        }
      }
    )
  }


  logout() {

    return this.http.post(this.url+`logout`, JSON.stringify({

      }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .map((response : Response) => {
        localStorage.removeItem('userEmail');
        this.router.navigate(['/']);
      })
  }

  register(username:string,password:string,email:string) {
    console.log(username);
    console.log(password);
    console.log(email);
    return this.http.post(this.url+`/register`, JSON.stringify({
        username: username,
        password: password,
        email: email
      }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .map((response : Response) => {
        let data = response.json();
        let user = data.user
        console.log(user)
        localStorage.setItem('userEmail', user.email)
      })
  }

  isLoggedIn() {
    return !!localStorage.getItem('userEmail');
  }
}
