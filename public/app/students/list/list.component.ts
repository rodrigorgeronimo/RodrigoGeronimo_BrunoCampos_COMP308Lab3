import { Component } from '@angular/core';
import { StudentsService } from '../students.service';
@Component({
    selector: 'list',
    templateUrl: 'app/students/list/list.template.html',
    styleUrls: ['./assets/css/style.css']
})
export class ListComponent {
    students: any;
    errorMessage: string;
    constructor(private _studentsService: StudentsService) { }
    ngOnInit() {
        this._studentsService.list().subscribe(students => this.students
            = students);
    }
}

