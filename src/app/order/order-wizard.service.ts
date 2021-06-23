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

  order: Order = { items: [] };
  day: Date;
  startTime: Time;
  endTime: Time;

  setOrder = (id: string): Promise<Order> => {
    return new Promise((resolve, reject) => {
      this.getOrder(id).then((value) => {
        this.order = value;
        this.changeStatus(value.status)
        resolve(value);
      }, reject);
    });
  };

  submit = (): Promise<Order> => {
    console.log(this.order);
    this.order.status = Number(this.order.status.toString()[0]);
    this.order.windowStart = this.switchDateToJsonString(
      this.order.windowStart
    );
    this.order.windowEnd = this.switchDateToJsonString(this.order.windowEnd);
    this.order.customerId = this.order.customer.id;
    this.order.restaurantId = this.order.restaurant.id;

    let submission = (): Promise<Order> => {
      return this.checkIfValueExists(this.order.id)
        ? this.updateOrder(this.order)
        : this.createOrder(this.order);
    };

    return new Promise((resolve) => {
      submission().then((resp) => {
        resolve(this.setOrder(resp.id));
      });
    });
  };

  switchDateToJsonString(date: Date | string): string {
    return date.toString().replace(' ', 'T');
  }

  changeStatus = (status: number | string) => {
    if (typeof status == 'number') {
      this.order.status = this.statuses[status]
    } else {
      this.order.status = status;
    }
  };

  changeCustomer = (customer: User) => {
    this.order.customerId = customer.userId;
    this.order.customer = customer;
  };

  changeDestination = (location: Location) => {
    this.order.destination = location;
  };

  addFood = (quantity: number, food: Food) => {
    let item: LineItem = { food: food.foodId, quantity: quantity };
    this.order.items.push(item);
  };

  removeFood = (food: Food) => {
    this.order.items.filter((x) => x.food != food.foodId);
  };

  setRestaurant = (restaurant: Restaurant) => {
    this.order.restaurant = restaurant;
    this.order.items = [];
  };

  setWindow = (startTime: Date, endTime: Date) => {
    this.order.windowStart = startTime;
    this.order.windowEnd = endTime;
  };

  getState = (name: string): Object => {
    return this.states.filter((x) => {
      x.name.toLowerCase() == name.toLowerCase();
    })[0];
  };

  statesList() {
    return this.states;
  }

  statusList() {
    return this.statuses
  }

  statuses = [
    '0 - Created',
    '1 - Paid',
    '2 - Started',
    '3 - In Transit',
    '4 - Complete',
    '5 - Cancelled',
  ];

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' },
  ];
}
