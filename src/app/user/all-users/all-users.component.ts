import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Listable } from 'src/app/table/table.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  listConfig: Listable
  pageSize: number

  constructor(
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.pageSize = 10
    this.listConfig = {
      idProperty: 'userId',
      nameProperty: 'username',
      columns: [
        {column: 'Username', property: 'username'},
        {column: 'Role', property: 'role.name'},
        {column: 'First Name', property: 'firstName'},
        {column: 'Last Name', property: 'lastName'}
      ],
      get: this.service.getAllUsers,
      detailRoute: 'users'
    }
  }

}
