import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  base = "http://localhost:8080/apis/restaurant"
  constructor() { }
}
