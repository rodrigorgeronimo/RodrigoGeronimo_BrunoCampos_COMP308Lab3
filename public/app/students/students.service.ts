import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestMethod, Response} from '@angular/http';
@Injectable()
export class StudentsService {
    private _baseURL = 'api/students';
    constructor(private _http: Http) { }
    create(student: any): Observable<any> {
        return this._http
            .post(this._baseURL, student)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    read(studentId: string): Observable<any> {
        return this._http
            .get(`${this._baseURL}/${studentId}`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    } update(student: any): Observable<any> {
        return this._http
            .put(`${this._baseURL}/${student._id}`, student).map((res: Response) => res.json())
            .catch(this.handleError);
    }
    delete(studentId: any): Observable<any> {
        return this._http
            .delete(`${this._baseURL}/${studentId}`)
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
