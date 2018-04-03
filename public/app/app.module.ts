import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //required for ngModel to work in HTML
//
import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { AboutComponent } from './about.component';
//
import { RouterModule }   from '@angular/router';
import { AppRoutes }       from './app.routes';
//
@NgModule({
    imports: [
        BrowserModule, FormsModule, RouterModule.forRoot(AppRoutes),
    ],
    //declare all components here
    declarations: [
        AboutComponent, SampleComponent, AppComponent 
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})
export class AppModule { }
