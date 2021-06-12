import { Injectable, Predicate } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Restaurant } from '../model/restaurant';
import { User } from '../model/user';
import { BackendService } from './backend-core/backend.service';
import { ApiService } from './backend-core/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService extends BackendService<Restaurant> {

  private baseUrl = "http://localhost:8080/apis/restaurant"

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router
    ) {
      super(api, router)
      this.base = "apis/restaurant"
     }

  getRestaurants = this.getPage
  getRestaurant = this.getObject
  createRestaurant = this.createObject
  updateRestaurant = this.updateObject
  deleteRestaurant = this.deleteObject

  
  addManager = (id: string, user: User): Promise<Restaurant> => {
    return this.updateObject(`/s${id}/managers/${user.userId}`, user)
  }

  // updateRestaurant = (payload: Restaurant) => {
  //   return new Promise((resolve, reject) => {
  //     this.http.put(`${this.baseUrl}/${payload.restaurantId}`, payload).subscribe(
  //       (resp) => {
  //         resolve(resp)
  //       },
  //       (err) => {
  //         reject(err)
  //       }
  //     )
  //   })


  // }

  // deleteRestaurant = (id: string): Promise<HttpResponse<any>> => {
  //   return new Promise((resolve, reject) => {
  //     this.http.delete<Restaurant>(`${this.baseUrl}/${id}`, {observe: 'response'}).subscribe(
  //       (resp) => {
  //         resolve(resp)
  //       },
  //       (err) => {
  //         reject(err)
  //       }
  //     )
  //   })
  // }


  // addManager = (id: string, user: User): Promise<HttpResponse<Restaurant>> => {
  //   const payload = {
  //     userId: user.userId,
  //     username: user.username,
  //     role: user.role,
  //     isActive: user.isActive
  //   }
  //   const endpoint = `s/${Number(id)}/managers/${Number(user.userId)}`
  //   return new Promise((resolve, reject) => {
  //     this.http.put<Restaurant>(`${this.baseUrl}${endpoint}`, payload, {observe: 'response'}).subscribe(
  //       (resp) => {
  //         resolve(resp)
  //       },
  //       (err) => {
  //         reject(err)
  //       }
  //     )
  //   })
  // }

  removeManager = (id: string, payload: User): Promise<Restaurant> => {
    return this.deleteObject(`s/${id}/managers/${payload.userId}`)
  }

  // removeManager = (id: string, payload: User): Promise<HttpResponse<Restaurant>> => {
  //   const endpoint = `s/${id}/managers/${payload.userId}`
  //   return new Promise((resolve, reject) => {
  //     this.http.delete<Restaurant>(`${this.baseUrl}${endpoint}`, {observe: 'response'}).subscribe(
  //       (resp) => {
  //         resolve(resp)
  //       },
  //       (err) => {
  //         reject(err)
  //       }
  //     )
  //   })
  // }
}
