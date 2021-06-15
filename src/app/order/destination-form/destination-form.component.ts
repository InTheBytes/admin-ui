import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddressPipe } from 'src/app/pipes/address.pipe';
import { Order } from 'src/app/shared/model/order';

@Component({
  selector: 'app-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.css']
})
export class DestinationFormComponent {
  @Input() existingOrder?: Order
  order: Order

  addressForm = this.fb.group({
    status: [0, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    date: [null, Validators.required],
    startTime: [null, Validators.required],
    endTime: [null, Validators.required]
  });

  hasUnitNumber = false;

  statuses = [
    {code: 0, description: 'Created'},
    {code: 1, description: 'Paid'},
    {code: 2, description: 'Started'},
    {code: 3, description: 'In Transit'},
    {code: 4, description: 'Complete'},
    {code: 5, description: 'Cancelled'}
  ]

  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Arizona', abbreviation: 'AZ'},
    {name: 'Arkansas', abbreviation: 'AR'},
    {name: 'California', abbreviation: 'CA'},
    {name: 'Colorado', abbreviation: 'CO'},
    {name: 'Connecticut', abbreviation: 'CT'},
    {name: 'Delaware', abbreviation: 'DE'},
    {name: 'District Of Columbia', abbreviation: 'DC'},
    {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
    {name: 'Florida', abbreviation: 'FL'},
    {name: 'Georgia', abbreviation: 'GA'},
    {name: 'Guam', abbreviation: 'GU'},
    {name: 'Hawaii', abbreviation: 'HI'},
    {name: 'Idaho', abbreviation: 'ID'},
    {name: 'Illinois', abbreviation: 'IL'},
    {name: 'Indiana', abbreviation: 'IN'},
    {name: 'Iowa', abbreviation: 'IA'},
    {name: 'Kansas', abbreviation: 'KS'},
    {name: 'Kentucky', abbreviation: 'KY'},
    {name: 'Louisiana', abbreviation: 'LA'},
    {name: 'Maine', abbreviation: 'ME'},
    {name: 'Marshall Islands', abbreviation: 'MH'},
    {name: 'Maryland', abbreviation: 'MD'},
    {name: 'Massachusetts', abbreviation: 'MA'},
    {name: 'Michigan', abbreviation: 'MI'},
    {name: 'Minnesota', abbreviation: 'MN'},
    {name: 'Mississippi', abbreviation: 'MS'},
    {name: 'Missouri', abbreviation: 'MO'},
    {name: 'Montana', abbreviation: 'MT'},
    {name: 'Nebraska', abbreviation: 'NE'},
    {name: 'Nevada', abbreviation: 'NV'},
    {name: 'New Hampshire', abbreviation: 'NH'},
    {name: 'New Jersey', abbreviation: 'NJ'},
    {name: 'New Mexico', abbreviation: 'NM'},
    {name: 'New York', abbreviation: 'NY'},
    {name: 'North Carolina', abbreviation: 'NC'},
    {name: 'North Dakota', abbreviation: 'ND'},
    {name: 'Northern Mariana Islands', abbreviation: 'MP'},
    {name: 'Ohio', abbreviation: 'OH'},
    {name: 'Oklahoma', abbreviation: 'OK'},
    {name: 'Oregon', abbreviation: 'OR'},
    {name: 'Palau', abbreviation: 'PW'},
    {name: 'Pennsylvania', abbreviation: 'PA'},
    {name: 'Puerto Rico', abbreviation: 'PR'},
    {name: 'Rhode Island', abbreviation: 'RI'},
    {name: 'South Carolina', abbreviation: 'SC'},
    {name: 'South Dakota', abbreviation: 'SD'},
    {name: 'Tennessee', abbreviation: 'TN'},
    {name: 'Texas', abbreviation: 'TX'},
    {name: 'Utah', abbreviation: 'UT'},
    {name: 'Vermont', abbreviation: 'VT'},
    {name: 'Virgin Islands', abbreviation: 'VI'},
    {name: 'Virginia', abbreviation: 'VA'},
    {name: 'Washington', abbreviation: 'WA'},
    {name: 'West Virginia', abbreviation: 'WV'},
    {name: 'Wisconsin', abbreviation: 'WI'},
    {name: 'Wyoming', abbreviation: 'WY'}
  ];

  addressPipe = new AddressPipe()
  today = new Date()
  state: Object

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (typeof this.order != 'undefined' && this.order != null) {
      // this.state = this.findState()
      console.log(this.order)

      this.addressForm.value.address = `${this.order.destination.unit} ${this.order.destination.street}`
      this.addressForm.value.city = this.order.destination.city
      this.addressForm.value.state = this.findState()
      this.addressForm.value.postalCode = this.order.destination.zipCode
      
    }
    console.log('form initialized')
  }

  findState(): Object {
    let copy = this.states
    copy.filter((x) => (x.name.toLowerCase() == this.order.destination.state.toLowerCase() ||
      x.abbreviation.toLowerCase() == this.order.destination.state.toLowerCase()))
    this.state = copy[0]
    return copy[0]
  }

  onSubmit(): void {
    // this.order.destination.zipCode = this.addressForm.value.postalCode
    // this.order.destination.state = this.addressForm.value.state.abbreviation
    // this.order.destination.city = this.addressForm.value.city
    // this.parseAddress()
  }

  parseAddress() {
    let address = (this.addressForm.value.address + this.addressForm.value.address2).split(' ').split(',')
    this.order.destination.unit = address[0]
    let street = ''
    for (let a in address) {
      street += ` ${a}`
    }
    this.order.destination.street = street.substring(1)
  }
}
