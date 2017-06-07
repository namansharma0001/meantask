import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms'

import { UpdateService } from './update.service'

declare var $: any;

@Component({
    selector: 'update',
    templateUrl: 'update.component.html',
    styleUrls: ['update.component.css']
})

export class UpdateComponent implements OnInit {
    loginMessage: string
    timeOut: number = 1800

    user

    updateForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
    })

    constructor(
        private router: Router,
        public fb: FormBuilder,
        public updateService: UpdateService
    ) { }

    ngOnInit() {
        this.updateService.getDetailsForUpdate()
            .subscribe(data => {
                this.user = data.user
                var name = this.user.name
                var email = this.user.email
                this.updateForm.patchValue({ name, email })
            },
            error => {
                console.log(error)
            })
    }

    updateUser(event) {
        event.preventDefault()
        var name = this.updateForm.value.name
        var email = this.updateForm.value.email
        this.updateService.updateUser(name, email)
            .subscribe(data => {
                console.log(data)
                if (data.status == 'Success')
                    this.router.navigate(['/posts'])
            },
            error => {
                console.log(error)
            })
    }
}
