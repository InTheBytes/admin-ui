import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

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

  deleteRestaurantForm: FormGroup;
  deleteName: string;
  deleteId: number;


  private modalRef: NgbModalRef;

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.initializeRestaurants()
    this.initializeForms()
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

  initializeForms() {
    this.searchRestaurantForm = new FormGroup({
      searchString: new FormControl(this.searchString, [Validators.maxLength(35)])
    })
    this.deleteRestaurantForm = new FormGroup({
      deleteId: new FormControl(this.deleteId, [Validators.required]),
      deleteName: new FormControl(this.deleteName, [Validators.required])
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

  open(content, obj: Restaurant) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => { },
      (reason) => { }
    )
  }

  deleteRestaurant(restaurant: Restaurant) {
    this.restaurantService.deleteRestaurant(restaurant.restaurantId);
  }
}
