import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Listable } from 'src/app/table/table.component';

@Component({
  selector: 'app-browse-restaurant',
  templateUrl: './browse-restaurant.component.html',
  styleUrls: ['./browse-restaurant.component.css'],
  providers: [ RestaurantService ]
})
export class BrowseRestaurantComponent implements OnInit {

  
  pageSize: number = 10
  listConfig: Listable = {
    idProperty: "restaurantId",
    nameProperty: "name",
    columns: [
      {property: "name", column: "Name"},
      {property: "cuisine", column: "Cuisine"},
      {property: "location.city", column: "City"},
      {property: "location.state", column: "State"}
    ],
    get: this.restaurantService.getRestaurants,
    delete: this.restaurantService.deleteRestaurant,
    detailRoute: 'restaurants'
  }

  constructor(
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    
  }

}
