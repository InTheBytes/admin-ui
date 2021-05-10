import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Listable } from 'src/app/shared/component/listing/listing.component';
import { User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-browse-user',
  templateUrl: './browse-user.component.html',
  styleUrls: ['./browse-user.component.css']
})
export class BrowseUserComponent implements OnInit {

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
      get: this.service.getActiveUsers,
      delete: this.service.deleteUser,
      deleteLabel: 'Deactivate',
      detailRoute: 'users'
    }
  }
}
