import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Order } from 'src/app/shared/model/order';
import { OrderWizardService } from '../order-wizard.service';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.css'],
  providers: [ ]
})
export class DetailFormComponent implements OnInit {

  @Input() order: Order;
  @Output() submitNotification = new EventEmitter();

  state = this.service.order.destination.state
  states = this.service.statesList()

  detailForm = this.fb.group({
    status: [this.service.order.status, Validators.required],
    address: [
      `${this.service.order.destination.unit} ${this.service.order.destination.street}`, Validators.required
    ],
    city: [this.service.order.destination.city, Validators.required],
    state: [this.service.order.destination.state, Validators.required],
    zipCode: [this.service.order.destination.zipCode, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    // date: [null, Validators.required],
    startTime: [this.service.order.windowStart, Validators.required],
    endTime: [this.service.order.windowEnd, Validators.required]})

  constructor(
    private fb: FormBuilder,
    private service: OrderWizardService
  ) { }

  ngOnInit(): void {
    // console.log('form initialized')
  };

  onSubmit() {
    this.submitNotification.emit()
  }

  statuses = [
    '0 - Created', 
    '1 - Paid', 
    '2 - Started', 
    '3 - In Transit', 
    '4 - Complete',
    '5 - Cancelled'
  ]
}
