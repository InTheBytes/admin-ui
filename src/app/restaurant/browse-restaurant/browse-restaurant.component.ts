import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Listable } from 'src/app/shared/component/listing/listing.component';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-browse-restaurant',
  templateUrl: './browse-restaurant.component.html',
  styleUrls: ['./browse-restaurant.component.css']
})
export class BrowseRestaurantComponent implements OnInit {

  listConfig: Listable
  pageSize: number

  constructor(
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.pageSize = 10
    this.listConfig = {
      idProperty: "restaurantId",
      nameProperty: "name",
      columns: [
        {property: "name", column: "Name"},
        {property: "cuisine", column: "Cuisine"},
        {property: "location.city", column: "City"},
        {property: "location.state", column: "State"}
      ],
      get: this.restaurantService.getAllRestaurants,
      delete: this.restaurantService.deleteRestaurant,
      detailRoute: 'restaurants'
    }
  }

}
