import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private actRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initRestaurant()
    this.restaurantService
      .getRestaurant(Number(this.actRoute.snapshot.paramMap.get("restaurantId")))
      .subscribe((resp) => {         
        this.restaurant = resp;
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
