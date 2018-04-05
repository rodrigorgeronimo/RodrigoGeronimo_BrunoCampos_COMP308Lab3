System.register(['./courses.component', './create/create.component', './list/list.component', './view/view.component', './edit/edit.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var courses_component_1, create_component_1, list_component_1, view_component_1, edit_component_1;
    var CoursesRoutes;
    return {
        setters:[
            function (courses_component_1_1) {
                courses_component_1 = courses_component_1_1;
            },
            function (create_component_1_1) {
                create_component_1 = create_component_1_1;
            },
            function (list_component_1_1) {
                list_component_1 = list_component_1_1;
            },
            function (view_component_1_1) {
                view_component_1 = view_component_1_1;
            },
            function (edit_component_1_1) {
                edit_component_1 = edit_component_1_1;
            }],
        execute: function() {
            exports_1("CoursesRoutes", CoursesRoutes = [{
                    path: 'courses',
                    component: courses_component_1.CoursesComponent,
                    children: [
                        { path: '', component: list_component_1.ListComponent },
                        { path: 'create', component: create_component_1.CreateComponent },
                        { path: ':courseId', component: view_component_1.ViewComponent },
                        { path: ':courseId/edit', component: edit_component_1.EditComponent }
                    ],
                }]);
        }
    }
});
//# sourceMappingURL=courses.routes.js.map