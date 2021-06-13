import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [ ]
})
export class OrderComponent implements OnInit {
  
  constructor(
    private service: OrderService
  ) { }

  ngOnInit(): void {
    
  }

}
