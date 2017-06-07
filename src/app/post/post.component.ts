import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { postfilterP } from './filterP.pipe'
import {Authentication} from '../login/authentication';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})

export class PostComponent implements OnInit {

  posts: any;
  title:string;
  author:string;
  content:string;
  term:any;
  value:any;

  public addForm = this.fb.group({
    title: ["", Validators.required],
    author: ["", Validators.required],
    content: ["", Validators.required],
  })


  constructor(private route: ActivatedRoute, private router: Router,
    private postService: PostService, public fb: FormBuilder,public auth: Authentication) { }

  ngOnInit() {
    this.getPostList();
  }

  getPostList() {
    this.postService.getAllPosts().then((res) => {
      this.posts = res;
    }, (err) => {
      console.log(err);
    });
  }

  deletePost(id) {
  this.postService.deletePost(id).then((result) => {
    this.getPostList();
    this.addForm.reset()

  }, (err) => {
    console.log(err);
  });
  }

  savePost(event) {
    event.preventDefault()
    var formData = this.addForm.value
   var post = {
     title:formData.title,
     author:formData.author,
     content:formData.content
   }

   this.postService.savePost(post).then((result) => {
     let id = result['_id'];
     this.addForm.reset()
      this.getPostList();
   }, (err) => {
     console.log(err);
   });
 }

 updateProfile() {
   this.router.navigate(['/update'])
 }

 logOut() {
      this.auth.logout()
     .subscribe(
       data => {
         this.router.navigate(['/'])
       },
       (error) => {
         alert(error);
       }
     );
 }

}
