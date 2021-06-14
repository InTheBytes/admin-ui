import { Time } from '@angular/common';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LineItem, Order } from 'src/app/shared/model/order';
import { Food, Restaurant, Location } from 'src/app/shared/model/restaurant';
import { User } from 'src/app/shared/model/user';
import { ApiService } from 'src/app/shared/services/backend-core/api.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Injectable()
export class OrderWizardService extends OrderService {
  constructor(private rootApi: ApiService, private route: Router) {
    super(rootApi, route);
  }

  order: Order = {items: []};

  setOrder = (id: string): Promise<Order> => {
    return new Promise((resolve, reject) => {
      this.getOrder(id).then(
        (value) => {
          this.order = value
          resolve(value)
        }, reject
      )
    })
  };

  submit = (order: Order): Promise<Order> => {
    if (typeof order.status == 'string') {
      let status = Number(order.status[0])
    }
    return (this.checkIfValueExists(order.id)) ? this.updateOrder(order) : this.createOrder(order);
  };

  changeStatus = (status: number) => {
    this.order.status = status
  }

  changeCustomer = (customer: User) => {
    this.order.customerId = customer.userId
    this.order.customer = customer
  }

  changeDestination = (location: Location) => {
    this.order.destination = location
  };

  addFood = (quantity: number, food: Food) => {
    let item: LineItem = {food: food.foodId, quantity: quantity}
    this.order.items.push(item)
  }

  removeFood = (food: Food) => {
    this.order.items.filter((x) => x.food != food.foodId)
  }

  setRestaurant = (restaurant: Restaurant) => {
    this.order.restaurant = restaurant
    this.order.items = []
  }

  setWindow = (startTime: Time, endTime: Time) => {
    this.order.windowStart = startTime
    this.order.windowEnd = endTime
  }
  
}
