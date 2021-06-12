import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/model/order';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { AddressPipe } from 'src/app/shared/pipes/address-pipe';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderWizardService } from './order-wizard.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [ OrderWizardService, AddressPipe ]
})
export class OrderDetailsComponent implements OnInit {
  hasFailed: boolean = false
  message: string
  order: Order = {customer: {}, items: []}

  constructor(
    private service: OrderWizardService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.order)
    this.service.setOrder(this.actRoute.snapshot.paramMap.get("orderId")).then(
      (x) => { this.refresh() }, this.catchError
    )
  }

  refresh = () => {this.order = this.service.order}

  catchError(err: HttpErrorResponse): void {
    switch(err.status) {
      case 404:
        this.message = 'Order not found'
        break;
      default:
        this.message = 'Something went wrong'
    }
    this.hasFailed = true;
  }

}
