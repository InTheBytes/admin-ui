import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User
  success: boolean;
  message: string;
  inactive: boolean;
  activateFailed: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.message = ''
    this.service.getUser(Number(this.actRoute.snapshot.paramMap.get("userId"))).then(
      (resp) => {
        this.user = resp.body
        this.inactive = !this.user.isActive
        this.success = true
      },
      (err) => {
        this.message = `Error: ${err}`
      }
    )
  }

  activate() {
    this.user.isActive = true
    this.service.updateUser(this.user).then(
      (resp) => {
        this.user = resp.body
        this.inactive = !this.user.isActive
      },
      (err) => {
        this.message = `Error: ${err}`
        this.activateFailed = true
      }
    )
  }

  deactivate() {
    this.service.deleteUser(Number(this.actRoute.snapshot.paramMap.get("userId"))).then(
      (resp) => {
        this.user = resp.body
        this.inactive = !this.user.isActive
      },
      (err) => {
        this.message = `Error: ${err}`
        this.activateFailed = true
      }
    )
  }

}
