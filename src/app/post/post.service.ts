import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment'


@Injectable()
export class PostService {
  url: string
      timeout: number = 20000
      constructor(private http: Http) {
          if (environment.production) {
          this.url = `api/`
          } else {
          this.url = `http://localhost:3000/api/`
          }
      }
  getAllPosts() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url +'posts')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  deletePost(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
        this.http.delete(this.url+'post/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  savePost(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
        this.http.post(this.url +'post/new', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}
