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

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router
    ) {
      super(api, router)
      this.base = "restaurant"
     }

  getRestaurants = this.getPage
  getRestaurant = this.getObject
  createRestaurant = this.createObject
  updateRestaurant = this.updateObject
  deleteRestaurant = this.deleteObject

  
  addManager = (id: string, user: User): Promise<Restaurant> => {
    return this.updateObject(`${id}/manager/${user.userId}`, user)
  }

  removeManager = (id: string, payload: User): Promise<Restaurant> => {
    return this.deleteObject(`${id}/manager/${payload.userId}`)
  }
}
