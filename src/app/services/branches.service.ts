import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recording } from '../models/recordModel';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.URL

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${baseUrl}/branches`)
      .toPromise()
      .then(res => res.result)
      .then(data => {
         return data; });
  }

  delete(id) {
    return this.http.delete<any>(`${baseUrl}/branches/${id}`)
      .toPromise()
      .then(res => res.result)
      .then(data => {
         return data; });
  }
}
