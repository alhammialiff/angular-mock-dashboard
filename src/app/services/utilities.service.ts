import { Injectable } from '@angular/core';
import { Utilities } from '../shared/utilities';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private http: HttpClient) { }

  getUtilities(): Observable<Utilities[]>{

    return this.http.get<Utilities[]>(baseURL + 'utilities');

  }
}
