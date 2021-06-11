import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:8080"
  authLabel: string = "Authentication"
  auth: string
  headers: HttpHeaders

  constructor(
    private http: HttpClient
  ) { }

  configure() {
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    if (typeof this.auth != 'undefined' && this.auth.length > 0) {
      this.headers = this.headers.set(this.authLabel, this.auth)
    }
  }

  get<T>(endpoint: string): Observable<HttpResponse<T>> {
    this.configure()
    return this.http.get<T>(
      `${this.url}/${endpoint}`, {headers: this.headers, observe: 'response'}
    )
  }

  delete(endpoint: string): Observable<HttpResponse<any>> {
    this.configure()
    return this.http.delete(
      `${this.url}/${endpoint}`, {headers: this.headers, observe: 'response'}
    )
  }

  put<T>(endpoint: string, payload: Object): Observable<HttpResponse<T>> {
    this.configure()
    return this.http.put<T>(
      `${this.url}/${endpoint}`, payload, {headers: this.headers, observe: 'response'}
    )
  }

  post<T>(endpoint: string, payload: Object): Observable<HttpResponse<T>> {
    this.configure()
    return this.http.post<T>(
      `${this.url}/${endpoint}`, payload, {headers: this.headers, observe: 'response'}
    )
  }
}
