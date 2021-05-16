import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { User } from 'src/app/shared/model/user';
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
  removalSuccess: boolean

  constructor(
    private restaurantService: RestaurantService,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.message = ''
    this.success = false
    this.removalSuccess = true
    this.restaurantService
      .getRestaurant(Number(this.actRoute.snapshot.paramMap.get("restaurantId")))
      .then((resp) => {         
        console.log("got restaurant " + resp)
        this.restaurant = resp;
        this.users = resp.managers
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

  removeManager(user: User) {
    this.restaurantService.removeManager(this.restaurant.restaurantId, user).then(
      (resp) => {
        this.restaurant = resp.body
        this.users = resp.body.managers
      },
      (err) => {
        this.message = "Error: Failed to remove manager"
        this.removalSuccess = false
        setTimeout(() => {
          this.removalSuccess = true
        }, 45000)
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
