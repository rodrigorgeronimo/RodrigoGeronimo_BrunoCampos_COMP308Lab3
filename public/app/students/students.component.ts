import { Component } from '@angular/core';
import { StudentsService } from './students.service';
@Component({
    selector: 'students',
    template: '<router-outlet></router-outlet>',
    providers: [StudentsService]
})
export class StudentsComponent { }
