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

  getAllRestaurants = async (pageSize: number, page: number, query?: string): Promise<HttpResponse<Restaurant[]>> => {
    let params = `page-size=${pageSize}&page=${page}`
    params += (typeof query !== 'undefined') ? `&${query}` : ''
    let result: HttpResponse<Restaurant[]>
    return new Promise((resolve, reject) => {
      this.http.get<Restaurant[]>(`${this.base}?${params}`, {observe: 'response'}).subscribe(
      (resp) => {
        resolve(resp)
      },
      (err) => {
        reject(err)
      }
    )})
  }

  getRestaurant(id: number): Promise<Restaurant> {
    return new Promise((resolve, reject) => {
      this.http.get<Restaurant>(`${this.base}/${id}`).subscribe(
      (resp) => {
        resolve(resp)
      },
      (err) => {
        reject(err)
      }
    )})
  }

  createRestaurant(payload: Restaurant): Promise<Restaurant> {
    const headers = {'content-type': 'application/json'}
    return new Promise((resolve, reject) => {
      this.http.post<Restaurant>(this.base, JSON.stringify(payload), {'headers': headers})
        .subscribe(
          (resp) => {
            resolve(resp)
          },
          (err) => {
            reject(err)
          }
        )
    })
  }

  updateRestaurant(payload: Restaurant) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.base}/${payload.restaurantId}`, payload).subscribe(
        (resp) => {
          resolve(resp)
        },
        (err) => {
          reject(err)
        }
      )
    })
    
    
  }

  deleteRestaurant(id: number): Promise<HttpResponse<any>> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.base}/${id}`, {observe: 'response'}).subscribe(
        (resp) => {
          resolve(resp)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }
}
