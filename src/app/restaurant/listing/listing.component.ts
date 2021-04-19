import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  restaurants: Restaurant[] = [];
  restaurantsMaster: Restaurant[] = [];
  restaurantsPaged: Restaurant[] = [];
  pageSize: number;
  page: number;
  searchRestaurantForm: FormGroup;
  searchString: string;

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initializeRestaurants()
    this.initializeSearch()
    this.page = 1
  }

  initializeRestaurants() {
    try {
      this.restaurantService
        .getAllRestaurants()
        .subscribe((resp) =>{
          this.restaurantsMaster = resp
          this.restaurants = this.restaurantsMaster
          if (this.restaurants.length < 10) {
            this.pageSize = this.restaurants.length
          } else {
            this.pageSize = 10;
          }
        })
    }catch (err) { }
  }

  initializeSearch() {
    this.searchRestaurantForm = new FormGroup({
      searchString: new FormControl(this.searchString, [Validators.maxLength(35)])
    })
  }

  searchRestaurants() {
    this.restaurants = this.restaurantsMaster
    this.restaurants = this.restaurants.filter(x => {
      return (x.name
        .toLowerCase()
        .search(this.searchRestaurantForm.value.searchString.toLowerCase()) != -1)
    })
  }
}
