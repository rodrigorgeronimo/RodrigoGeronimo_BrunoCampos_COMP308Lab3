import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';
@Component({
    selector: 'edit',
    templateUrl: 'app/courses/edit/edit.template.html'
})
export class EditComponent {
    course: any = {};
    errorMessage: string;
    paramsObserver: any;
    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _coursesService: CoursesService) { }
    ngOnInit() {
        this.paramsObserver = this._route.params.subscribe(params => {
            let courseId = params['courseId'];
            this._coursesService.read(courseId).subscribe(course => {
                this.course = course;
            },
                error => this._router.navigate(['/courses']));
});
    }
    ngOnDestroy() {
        this.paramsObserver.unsubscribe();
    }
    update() {
        this._coursesService.update(this.course).subscribe(savedCourse => this._router.navigate(['/courses', savedCourse._id]),
            error => this.errorMessage =
                error);
    }
}