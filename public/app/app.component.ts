import { Component } from '@angular/core';
import { SampleComponent } from './sample/sample.component';
import { ExampleService } from './example.service';

@Component({
    selector: 'mean-app',
    template: '<h1>I am an application component!</h1>',
    //templateUrl: '/app/app.template.html'

    //
    //templateUrl: '/app/about.template.html'
    

    //interpolation binding
    //template: '<h1>{{title}}</h1>'

    //property binding
    //template: '<button [disabled]="isButtonDisabled">My Button</button > ',
    
    //event binding
    //template: '<button (click)="showMessage()">Show Message</button>'

    //two-way binding
    //template: '<h1>Hello {{name}}</h1><br><input [(ngModel)] = "name" >'
    //
    //two-way binding using the template
    //templateUrl: '/app/app.template.html'

    // using a component as directive
    //template: '<sample-component></sample-component>'

    //using a service
    //template: '<h1>{{ title }}</h1>',
    //providers: [ExampleService]
    
})

export class AppComponent {

    //interpolatin binding
    //title = 'Angular 2 Data Binding - interpolation binding';
    //
    //property binding
    //isButtonDisabled = true;
    //
    //event binding
    //showMessage() {
    //    alert('This is a message!')
    //}
    //
    //Two-way binding
    //name = 'COMP-308'
    //
    ////Two-way binding using a template
    //student = { firstName: 'sara', lastName: 'green' };

    ////service related code
    //title: string;
    ////include the service through dependency injection
    //constructor(private _exampleService: ExampleService) {
    //}
    ////this life cycle methid is called after the constructor
    ////put initialization code here
    //ngOnInit() {
    //    this.title = this._exampleService.simpleMethod();
    //}



    
}
