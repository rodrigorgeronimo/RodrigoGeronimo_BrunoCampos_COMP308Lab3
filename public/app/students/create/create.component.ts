import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
@Component({
    selector: 'create',
    templateUrl: 'app/students/create/create.template.html',
    styleUrls: ['./assets/css/style.css']
})
export class CreateComponent {
    student: any = {};
    errorMessage: string;
    constructor(private _router: Router,
        private _studentsService: StudentsService) { }
    create() {
        this._studentsService
            .create(this.student)
            .subscribe(createdStudent => this._router.navigate(['/students',
                createdStudent._id]),
            error => this.errorMessage = error);
    }
}