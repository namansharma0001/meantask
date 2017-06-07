import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Authentication } from './authentication';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        public router: Router,
        private auth: Authentication

    ) {}

    canActivate (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) : boolean | Observable<boolean> {
        if ((this.auth.isLoggedIn())&&(state.url=='/')) {
            this.router.navigate(['/posts'])
            return Observable.of(false)
        }
        if ((!this.auth.isLoggedIn())&&(state.url!='/')){
            this.router.navigate(['/'])
            return Observable.of(false)
        }
         else {
            return true
        }

    }
}
