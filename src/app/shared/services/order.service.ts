import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../model/order';
import { Page } from '../model/page';
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

  // getOrdersPage(page?: number, pageSize?: number): Promise<Page<Order>> {
  //   return this.getPage(page, pageSize)
  // // }

  // getOrder(id: string): Promise<Order> {
  //   return this.getObject(id)
  // }

  // updateOrder(id: string, payload: Order): Promise<Order> {
  //   return this.updateObject(id, payload)
  // }

  // createOrder(payload: Order): Promise<Order> {
  //   return this.createObject(payload)
  // }
}
