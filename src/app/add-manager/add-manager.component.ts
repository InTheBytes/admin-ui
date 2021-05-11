import { Component, OnInit } from '@angular/core';
import { Listable } from '../shared/component/listing/listing.component';
import { User } from '../shared/model/user';
import { RestaurantService } from '../shared/services/restaurant.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnInit {

  listConfig: Listable
  pageSize: number
  onListing: Boolean

  constructor(
    private userService: UserService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.pageSize = 5
    this.listConfig = {
      idProperty: 'userId',
      nameProperty: 'username',
      columns: [
        {column: 'Username', property: 'username'},
        {column: 'Role', property: 'role.name'},
        {column: 'Email', property: 'email'},
        {column: 'First Name', property: 'firstName'},
        {column: 'Last Name', property: 'lastName'}
      ],
      get: this.userService.getActiveUsers,
      select: this.selectUser
    }
  }

  selectUser(user: User) {

  }

}
