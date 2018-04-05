import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestMethod, Response} from '@angular/http';
@Injectable()
export class CoursesService {
    private _baseURL = 'api/courses';
    constructor(private _http: Http) { }
    create(course: any): Observable<any> {
        return this._http
            .post(this._baseURL, course)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    read(courseId: string): Observable<any> {
        return this._http
            .get(`${this._baseURL}/${courseId}`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    } update(course: any): Observable<any> {
        return this._http
            .put(`${this._baseURL}/${course._id}`, course).map((res: Response) => res.json())
            .catch(this.handleError);
    }
    delete(courseId: any): Observable<any> {
        return this._http
            .delete(`${this._baseURL}/${courseId}`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    list(): Observable<any> {
        return this._http
            .get(this._baseURL)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().message || 'Server error');
    }
}
