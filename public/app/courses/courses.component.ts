import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
@Component({
    selector: 'courses',
    template: '<router-outlet></router-outlet>',
    providers: [CoursesService]
})
export class CoursesComponent { }
