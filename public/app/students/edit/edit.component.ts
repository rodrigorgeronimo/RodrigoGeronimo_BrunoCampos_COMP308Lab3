import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsService } from '../students.service';
@Component({
    selector: 'edit',
    templateUrl: 'app/students/edit/edit.template.html',
    styleUrls: ['./assets/css/style.css']
})
export class EditComponent {
    student: any = {};
    errorMessage: string;
    paramsObserver: any;
    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _studentsService: StudentsService) { }
    ngOnInit() {
        this.paramsObserver = this._route.params.subscribe(params => {
            let studentId = params['studentId'];
            this._studentsService.read(studentId).subscribe(student => {
                this.student = student;
            },
                error => this._router.navigate(['/students']));
});
    }
    ngOnDestroy() {
        this.paramsObserver.unsubscribe();
    }
    update() {
        this._studentsService.update(this.student).subscribe(savedStudent => this._router.navigate(['/students', savedStudent._id]),
            error => this.errorMessage =
                error);
    }
}