import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/shared/model/page';
import { User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Listable } from 'src/app/table/table.component';

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
      get: this.activeUsers,
      delete: this.service.deleteUser,
      deleteLabel: 'Deactivate',
      detailRoute: 'users'
    }
  }

  activeUsers = (page: number, pageSize: number): Promise<Page<User>> => {
    return this.service.getActiveUsers(page, pageSize);
  }
}
