import { Component } from '@angular/core';
import { CoursesService } from '../courses.service';
@Component({
    selector: 'list',
    templateUrl: 'app/courses/list/list.template.html',
    styleUrls: ['./assets/css/style.css']
})
export class ListComponent {
    courses: any;
    errorMessage: string;
    constructor(private _coursesService: CoursesService) { }
    ngOnInit() {
        this._coursesService.list().subscribe(courses => this.courses
            = courses);
    }
}

