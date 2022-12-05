import { Injectable } from '@angular/core';
import { Spending } from 'src/app/shared/spending';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {

  constructor(private http: HttpClient) { }

  getSpending(): Observable<Spending[]>{

    return this.http.get<Spending[]>(baseURL + 'spending');

  }

}

// Create Spending TS data type
// Import HttpClient, Spending, and processHTTPMsgService,
//  Observable, of, delay, baseURL, map, catchError, Injectable  
