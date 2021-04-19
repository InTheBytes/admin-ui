import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Restaurant } from '../model/restaurant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private base = "http://localhost:8080/apis/restaurant"
  constructor(private http: HttpClient) { }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.base)
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.base}/${id}`)
  }

  createRestaurant(payload: Restaurant) {
    return this.http.post(this.base, payload)
  }

  updateRestaurant(payload: Restaurant) {
    return this.http.put(`${this.base}/${payload.restaurantId}`, payload)
  }

  deleteRestaurant(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
