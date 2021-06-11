import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../model/order';
import { ApiService } from './backend-core/api.service';
import { BackendService } from './backend-core/backend.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BackendService<Order> {

  constructor(
    private api: ApiService,
    private router: Router
  ) { 
    super(api, router)
    this.base = "orders"
  }

  getOrdersPage = this.getPage
  getOrder = this.getObject
  updateOrder = this.updateObject
  createOrder = this.createObject
}
