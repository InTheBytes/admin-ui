import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  restaurant: Restaurant;

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router
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

  saveRestaurant() {
    this.restaurant = this.makeRestaurant()
    this.restaurantService.createRestaurant(this.restaurant).subscribe(data => {
      this.restaurant = data;
      this.router.navigate(['/restaurants/', this.restaurant.restaurantId])
    });
  }

  makeRestaurant(): Restaurant {
    return {
      restaurantId: 0,
      name: this.restaurantForm.value.name,
      cuisine: this.restaurantForm.value.cuisine,
      location: {
        locationId: 0,
        unit: this.restaurantForm.value.locationUnit,
        street: this.restaurantForm.value.locationStreet,
        city: this.restaurantForm.value.locationCity,
        state: this.restaurantForm.value.locationState,
        zipCode: this.restaurantForm.value.locationZip
      } 
    }
  }
}
