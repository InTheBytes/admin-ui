import { Component, OnInit } from '@angular/core';
import { Listable } from '../shared/component/listing/listing.component';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [ OrderService ]
})
export class OrderComponent implements OnInit {
  
  constructor(
    private service: OrderService
  ) { }

  ngOnInit(): void {
    
  }

}
