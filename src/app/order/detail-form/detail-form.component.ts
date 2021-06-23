import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Order } from 'src/app/shared/model/order';
import { Location } from 'src/app/shared/model/restaurant';
import { OrderWizardService } from '../order-wizard.service';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.css'],
  providers: [ ]
})
export class DetailFormComponent implements OnInit {

  @Input() order: Order;
  @Output() submitNotification = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private service: OrderWizardService
  ) { }

  state = this.service.order.destination.state
  states = this.service.statesList()
  statuses = this.service.statusList()
  today = Date.now()
  date = new FormControl(this.service.order.windowStart)

  detailForm = this.fb.group({
    status: [this.service.statuses.filter((x) => x[0] == this.service.order.status[0])[0], Validators.required],
    date: [this.service.order.windowStart, Validators.required],
    address: [
      `${this.service.order.destination.street} ${this.service.order.destination.unit}`, Validators.required
    ],
    city: [this.service.order.destination.city, Validators.required],
    state: [this.service.order.destination.state, Validators.required],
    zipCode: [this.service.order.destination.zipCode, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    startTime: [this.service.order.windowStart, Validators.required],
    endTime: [this.service.order.windowEnd, Validators.required]})

  ngOnInit(): void {
  };

  onSubmit() {
    this.service.changeStatus(this.detailForm.value.status)
    this.service.changeDestination(this.makeDestination())
    this.submitNotification.emit(true)
  }

  onRollback() {
    this.submitNotification.emit(false)
  }

  makeDestination(): Location {
    let addressString: string = this.detailForm.value.address
    let address = addressString.split(' ')
    let unit = address.shift()
    addressString = address.join(' ')
    let destination = {
      unit: unit,
      street: addressString,
      city: this.detailForm.value.city,
      state: this.detailForm.value.state,
      zipCode: this.detailForm.value.zipCode
    }
    console.log(destination)
    return destination
  }
}