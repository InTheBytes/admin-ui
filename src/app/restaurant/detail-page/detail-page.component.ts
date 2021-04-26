import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  restaurant: Restaurant;
  message: string;
  success: boolean;

  constructor(
    private restaurantService: RestaurantService,
    private actRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.message = ''
    this.success = false
    this.initRestaurant()
    this.restaurantService
      .getRestaurant(Number(this.actRoute.snapshot.paramMap.get("restaurantId")))
      .subscribe((resp) => {         
        this.restaurant = resp;
        this.success = true;
      },
      (err) => {
        switch (err.status) {
          case 404:
            this.message =
            "404: This restaurant doesn't seem to exist"
            break;
          case 500:
            this.message = 'Something went wrong fetching the restaurant from the server'
            break;
          default:
            this.message = 
            "An unexpected error occured. Perhaps there's a problem with the connection"
        }
      })
    
  }

  initRestaurant() {
    const empty = {
      restaurantId: -1, name: "", cuisine: "",
      location: {
        locationId: 0, unit: "", street: "", city: "", state: "", zipCode: null
      }
    }
    this.restaurant = empty;
  }

}
