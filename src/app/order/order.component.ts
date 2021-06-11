import { Component, OnInit } from '@angular/core';
import { Listable } from '../shared/component/listing/listing.component';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  pageSize: number = 10
  
  listConfig: Listable = {
    idProperty: "id",
    nameProperty: "id",
    columns: [
      {property: "status", column: "Status"},
      {property: "restaurant.name", column: "Restaurant"},
      {property: "customer.name", column: "Customer"},
      {property: "destination", column: "Destination"},
      {property: "windowStart", column: "Window Start"},
      {property: "windowEnd", column: "Window End"}
    ],
    get: this.service.getOrdersPage,
    newPageStyle: true
  }

  constructor(
    private service: OrderService
  ) { }

  ngOnInit(): void {
    
  }

}
