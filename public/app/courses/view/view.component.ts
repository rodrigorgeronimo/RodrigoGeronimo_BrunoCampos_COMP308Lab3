import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CoursesService } from '../courses.service';
@Component({
    selector: 'view',
    templateUrl: 'app/courses/view/view.template.html',
})
export class ViewComponent {
    user: any;
    course: any;
    paramsObserver: any;
    errorMessage: string;
    allowEdit: boolean = false;
    //
    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _coursesService: CoursesService) { }
    //
    ngOnInit() {
        this.user = this._authenticationService.user
        this.paramsObserver = this._route.params.subscribe(params => {
            let courseId = params['courseId'];
            this._coursesService
                .read(courseId)
                .subscribe(
                course => {
                    this.course = course;
                    this.allowEdit = (this.user && this.user._id === this.
                        course.creator._id);
                },
                error => this._router.navigate(['/courses'])
                );
        });
    }
    //
    ngOnDestroy() {
        this.paramsObserver.unsubscribe();
    }
    //
    delete() {
        this._coursesService.delete(this.course._id).
            subscribe(deletedCourse => this._router.navigate(['/courses']),
            error => this.errorMessage = error);
    }
}
