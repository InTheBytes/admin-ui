import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @ViewChild('editUserTemplate') editUserTemplate: TemplateRef<any>

  editModal: NgbModalRef

  user: User
  success: boolean;
  message: string;
  inactive: boolean;
  activateFailed: boolean;
  editOpened: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private service: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.editOpened = false
    this.message = ''
    this.getUserData()
  }

  getUserData() {
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
        this.message = `Error: ${err.status}`
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
        this.message = `Error: ${err.status}`
        this.activateFailed = true
      }
    )
  }

  edit() {
    this.editModal = this.modalService.open(this.editUserTemplate)
    this.editOpened = true
  }

  updateUser = (userPromise: Promise<User>) => {
    userPromise.then(
    (resp) => {
      this.user = resp
    },
    (err) => { }
    )
  }

}
