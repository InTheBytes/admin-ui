import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {

  restaurantForm: FormGroup
  name: string
  cuisine: string
  locationUnit: string
  locationStreet: string
  locationCity: string
  locationState: string
  locationZip: number
  restaurant: Restaurant

  modalRef: NgbModalRef
  failMessage: string

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.restaurantForm = new FormGroup({
      name: new FormControl(this.name, {
        'validators': [Validators.minLength(3), Validators.required], 
        'updateOn':'change'}),
      cuisine: new FormControl(this.cuisine, {
        'validators': [Validators.minLength(3), Validators.required], 
        'updateOn':'change'}),
      locationUnit: new FormControl(this.locationUnit, {
        'validators': [Validators.required, Validators.maxLength(6)], 
        'updateOn':'change'}),
      locationStreet: new FormControl(this.locationStreet, {
        'validators': [Validators.required], 
        'updateOn':'change'}),
      locationCity: new FormControl(this.locationCity, {
        'validators': [Validators.required], 
        'updateOn':'change'}),
      locationState: new FormControl(this.locationState, {
        'validators': [Validators.required],
        'updateOn':'change'}),
      locationZip: new FormControl(this.locationZip, {
        'validators': [Validators.required, Validators.maxLength(5), Validators.minLength(5)], 
        'updateOn':'change'})
    })
  }

  saveRestaurant(failModal: TemplateRef<any>) {
    
    if (this.makeRestaurant() === null) {
      this.failMessage = "Please enter information for all of the fields"
      this.modalRef = this.modalService.open(failModal)
    } else {
      this.restaurant = this.makeRestaurant()
      this.restaurantService.createRestaurant(this.restaurant).then(data => {
        this.restaurant = data;
        this.router.navigate(['/restaurants/', this.restaurant.restaurantId])
      },
      (error) => {
        switch (error.status) {
          case 409:
            this.failMessage =
            "It looks like this restaurant already exists"
            break;
          case 500:
            this.failMessage = 'Something went wrong with the server'
            break;
          default:
            this.failMessage = 
            "An unexpected error occured. Perhaps there's a problem with the connection"
        }
        this.modalRef = this.modalService.open(failModal)
      });
    }
  }

  makeRestaurant(): Restaurant {
    if (this.restaurantForm.value.name == null || 
      this.restaurantForm.value.cuisine == null || 
      this.restaurantForm.value.locationUnit == null ||
      this.restaurantForm.value.locationStreet == null || 
      this.restaurantForm.value.locationCity == null || 
      this.restaurantForm.value.locationState == null ||
      this.restaurantForm.value.locationZip == null) {
        return null
      }
    return {
      restaurantId: "0",
      name: this.restaurantForm.value.name,
      cuisine: this.restaurantForm.value.cuisine,
      location: {
        locationId: "0",
        unit: this.restaurantForm.value.locationUnit,
        street: this.restaurantForm.value.locationStreet,
        city: this.restaurantForm.value.locationCity,
        state: this.restaurantForm.value.locationState,
        zipCode: this.restaurantForm.value.locationZip
      },
      managers: [] 
    }
  }
}
