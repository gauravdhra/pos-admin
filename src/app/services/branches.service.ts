import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Recording } from '../models/recordModel';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.URL

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  loadBranches = new EventEmitter<boolean>();
  
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

  update(id,user) {
    return this.http.post<any>(`${baseUrl}/branches/${id}`, user)
      .toPromise()
      .then(res => res.result)
      .then(data => {
         return data; });
  }
  // upload(file) {
  //   return this.http.post<any>(`${baseUrl}/branches/upload`,file)
  //     .toPromise()
  //     .then(res => res.result)
  //     .then(data => {
  //        return data; });
  // }
}
