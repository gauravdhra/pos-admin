import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recording } from '../models/recordModel';

@Injectable({
    providedIn: 'root'
})
export class RecordService {
    constructor(private http: HttpClient) { }

    getCustomersLarge() {
        return this.http.get<any>('assets/json/customers-large.json')
            .toPromise()
            .then(res => <Recording[]>res.data)
            .then(data => { return data; });
    }
}