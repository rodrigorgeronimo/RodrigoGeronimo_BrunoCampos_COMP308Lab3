import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
    selector: 'signup',
    templateUrl: 'app/authentication/signup/signup.template.html',
    styleUrls: ['./assets/css/style.css']
})
export class SignupComponent {
    errorMessage: string;
    student: any = {};
    constructor(private _authenticationService: AuthenticationService,
        private _router: Router) { }
    signup() {
        this._authenticationService.signup(this.student)
            .subscribe(result => this._router.navigate(['/']),
            error => this.errorMessage = error);
    }
}