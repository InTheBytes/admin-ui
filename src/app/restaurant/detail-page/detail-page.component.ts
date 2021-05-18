import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { Role, User } from 'src/app/shared/model/user';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  restaurant: Restaurant
  users: User[]
  message: string
  success: boolean
  modalRef: NgbModalRef
  adjustmentSuccess: boolean
  hasManagers: boolean

  role: Role = {
    roleId: 2,
    name: 'restaurant'
  }

  constructor(
    private restaurantService: RestaurantService,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.message = ''
    this.success = false
    this.adjustmentSuccess = true
    this.hasManagers = false
    this.restaurantService
      .getRestaurant(Number(this.actRoute.snapshot.paramMap.get("restaurantId")))
      .then((resp) => {         
        this.restaurant = resp;
        this.users = resp.managers
        this.success = true
        this.hasManagers = (typeof this.users !== 'undefined' && this.users.length > 0)
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

  removeManager(user: User) {
    this.restaurantService.removeManager(this.restaurant.restaurantId, user).then(
      (resp) => {
        this.restaurant = resp.body
        this.users = resp.body.managers
        this.hasManagers = (typeof this.users !== 'undefined' && this.users.length > 0)
      },
      (err) => {
        this.tempError("Failed to remove manager")
      }
    )
  }

  tempError(message: string) {
    this.message = `Error: ${message}`
    this.adjustmentSuccess = false
    setTimeout(() => {
      this.adjustmentSuccess = true
    }, 45000)
  }

  addManager(user: User) {
    this.restaurantService.addManager(this.restaurant.restaurantId, user).then(
      (resp) => {
        this.restaurant = resp.body
        this.users = resp.body.managers
        this.hasManagers = (typeof this.users !== 'undefined' && this.users.length > 0)
      },
      (err) => {
        this.tempError("Failed to add manager")
      }
    )
  }

  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content)
    this.modalRef.result.then(
      (result) => {
        this.restaurantService.getRestaurant(this.restaurant.restaurantId).then(
          (resp) => {
            this.restaurant = resp
          },
          (err) => { }
        )
      },
      (reason) => { }
    )
  }
}
