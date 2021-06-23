import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LineItem, Order } from '../model/order';
import { Page } from '../model/page';
import { Food } from '../model/restaurant';
import { User } from '../model/user';
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
    this.base = "order"
  }

  getOrdersPage = this.getPage
  getOrder = this.getObject
  createOrder = this.createObject

  updateOrder = (order: Order): Promise<Order> => {
    return this.updateObject(order.id, order)
  }
}
