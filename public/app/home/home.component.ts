import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
@Component({
    selector: 'home',
    templateUrl: './app/home/home.template.html',
    styleUrls: ['./assets/css/style.css']
})
export class HomeComponent {
    user: any;
    constructor(private _authenticationService:
        AuthenticationService) {
        this.user = _authenticationService.user;
    }
}