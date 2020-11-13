import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recording } from '../models/recordModel';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.URL

@Injectable({
    providedIn: 'root'
})
export class RecordService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`${baseUrl}/recordings`)
            .toPromise()
            .then(res => <Recording[]>res.data)
            .then(data => { return data; });
    }
    getAllByID(id) {
        return this.http.get<any>(`${baseUrl}/recordings/${id}`)
            .toPromise()
            .then(res => <Recording[]>res.data)
            .then(data => { return data; });
    }

    // getAll(): Observable<any> {
    //     return this.http.get(`${baseUrl}/recordings`);
    // }

    get(id): Observable<any> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    create(data): Observable<any> {
        return this.http.post(baseUrl, data);
    }

    update(id, data): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
        return this.http.delete(baseUrl);
    }

    findByTitle(title): Observable<any> {
        return this.http.get(`${baseUrl}?title=${title}`);
    }
}