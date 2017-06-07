import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent }  from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';

import { PostComponent } from './post/post.component';

import { PostService } from './post/post.service';


import { Authentication } from './login/authentication'
import { postfilterP } from './post/filterP.pipe'

import { UpdateComponent } from './update/update.component'
import { UpdateService } from './update/update.service';


import { AuthGuard } from './login/login.guard'

const appRoutes: Routes = [
  { path: '',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  { path: 'posts',
    component: PostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update',
    component: UpdateComponent,
    canActivate: [AuthGuard]
  },

  { path: 'register',
    component: RegisterComponent
  }

];

@NgModule({
  providers: [
    AuthGuard,
    Authentication,
    PostService,
    postfilterP,
    UpdateService
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    PostComponent,
    postfilterP,
    RegisterComponent,
    UpdateComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
