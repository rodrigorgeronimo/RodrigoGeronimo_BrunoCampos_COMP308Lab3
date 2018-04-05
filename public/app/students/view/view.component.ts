import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { StudentsService } from '../students.service';
@Component({
    selector: 'view',
    templateUrl: 'app/students/view/view.template.html',
    styleUrls: ['./assets/css/style.css']
})
export class ViewComponent {
    user: any;
    student: any;
    paramsObserver: any;
    errorMessage: string;
    allowEdit: boolean = false;
    //
    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _studentsService: StudentsService) { }
    //
    ngOnInit() {
        this.user = this._authenticationService.user
        this.paramsObserver = this._route.params.subscribe(params => {
            let studentId = params['studentId'];
            this._studentsService
                .read(studentId)
                .subscribe(
                    student => {
                    this.student = student;
                    this.allowEdit = (this.user && this.user._id === this.
                        student.creator._id);
                },
                error => this._router.navigate(['/students'])
                );
        });
    }
    //
    ngOnDestroy() {
        this.paramsObserver.unsubscribe();
    }
    //
    delete() {
        this._studentsService.delete(this.student._id).
            subscribe(deletedStudent => this._router.navigate(['/students']),
            error => this.errorMessage = error);
    }
}