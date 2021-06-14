import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Listable } from 'src/app/table/table.component';

@Component({
  selector: 'app-browse-order',
  templateUrl: './browse-order.component.html',
  styleUrls: ['./browse-order.component.css']
})
export class BrowseOrderComponent implements OnInit {
  
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
    newPageStyle: true,
    detailRoute: 'orders'
  }


  constructor(
    private service: OrderService
  ) { }

  ngOnInit(): void {
  }

}
