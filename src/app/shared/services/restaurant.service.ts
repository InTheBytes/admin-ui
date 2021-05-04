import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Restaurant } from '../model/restaurant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private base = "http://localhost:8080/apis/restaurant"
  constructor(private http: HttpClient) { }

  getAllRestaurants(pageSize: number, page: number): Observable<HttpResponse<Restaurant[]>> {
    let params = `page-size=${pageSize}&page=${page}`
    return this.http.get<Restaurant[]>(`${this.base}?${params}`, {observe: 'response'})
    
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.base}/${id}`)
  }

  createRestaurant(payload: Restaurant): Observable<Restaurant> {
    const headers = {'content-type': 'application/json'}
    return this.http.post<Restaurant>(this.base, JSON.stringify(payload), {'headers': headers})
  }

  updateRestaurant(payload: Restaurant) {
    return this.http.put(`${this.base}/${payload.restaurantId}`, payload)
  }

  deleteRestaurant(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
