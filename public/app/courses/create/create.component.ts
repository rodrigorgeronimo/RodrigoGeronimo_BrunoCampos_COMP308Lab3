import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../courses.service';
@Component({
    selector: 'create',
    templateUrl: 'app/courses/create/create.template.html'
})
export class CreateComponent {
    course: any = {};
    errorMessage: string;
    constructor(private _router: Router,
        private _coursesService: CoursesService) { }
    create() {
        this._coursesService
            .create(this.course)
            .subscribe(createdCourse => this._router.navigate(['/courses',
                createdCourse._id]),
            error => this.errorMessage = error);
    }
}
