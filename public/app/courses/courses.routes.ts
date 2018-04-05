import { Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
export const CoursesRoutes: Routes = [{
    path: 'courses',
    component: CoursesComponent,
    children: [
        { path: '', component: ListComponent },
        { path: 'create', component: CreateComponent },
        { path: ':courseId', component: ViewComponent },
        { path: ':courseId/edit', component: EditComponent }
    ],
}];