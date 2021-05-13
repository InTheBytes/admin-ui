import { Component, Injector, Input, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Listable } from '../../shared/component/listing/listing.component';
import { Restaurant } from '../../shared/model/restaurant';
import { User } from '../../shared/model/user';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnInit {

  @Input() restaurant: Restaurant
  @Input() modalRef: NgbModalRef
  // @Input() restaurantService: RestaurantService

  listConfig: Listable
  pageSize: number
  onListing: Boolean

  restaurantCopy: Restaurant
  modalCopy: NgbModalRef
  serviceCopy: RestaurantService

  // restaurantService: RestaurantService

  constructor(
    private userService: UserService,
    private restaurantService: RestaurantService,
    // private injector: Injector
  ) { }

  ngOnInit(): void {
    // this.restaurantService = this.injector.get(RestaurantService)
    this.restaurantCopy = this.restaurant
    this.modalCopy = this.modalRef
    this.serviceCopy = this.restaurantService
    this.pageSize = 5
    this.listConfig = {
      idProperty: 'userId',
      nameProperty: 'username',
      columns: [
        {column: 'Username', property: 'username'},
        {column: 'Email', property: 'email'}
      ],
      get: this.userService.filterGetUsers((x: User) => { return x.role.name !== 'restaurant' }),
      select: this.selectUser,
      parent: this
    }
  }

  selectUser(user: User) {
    this.restaurantService.addManager(this.restaurant.restaurantId, user)
    this.modalRef.close(this.restaurant)
  }

}
