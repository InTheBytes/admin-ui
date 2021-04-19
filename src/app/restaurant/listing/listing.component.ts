import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  restaurants: Restaurant[] = [];
  restaurantsPaged: Restaurant[] = [];
  pageSize: number = 10;
  page: number;


  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.initializeRestaurants()
    this.page = 1
  }

  initializeRestaurants() {
    try {
      this.restaurantService
        .getAllRestaurants()
        .subscribe((resp) =>{
          this.restaurants = resp
        })
    }catch (err) { }
  }

}
