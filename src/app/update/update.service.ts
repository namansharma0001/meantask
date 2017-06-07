import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, URLSearchParams } from '@angular/http'
import 'rxjs/Rx'

import { environment } from '../../environments/environment'

@Injectable()
export class UpdateService {
    url
    constructor(private http: Http) {
        if (environment.production)
            this.url = `api/`
        else
            this.url = `http://localhost:3000/api/`
    }

    getDetailsForUpdate() {
        var userEmail = localStorage.getItem('userEmail')
        return this.http.get(this.url + 'view/' + userEmail)
            .map((response: Response) => response.json())
    }

    updateUser(name, email) {
        return this.http.post(this.url + 'edit', { name, email })
            .map((response: Response) => response.json())
    }
}