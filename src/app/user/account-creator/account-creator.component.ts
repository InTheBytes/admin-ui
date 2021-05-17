import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Role, User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-account-creator',
  templateUrl: './account-creator.component.html',
  styleUrls: ['./account-creator.component.css']
})
export class AccountCreatorComponent implements OnInit {

  @Input() modalRef?: NgbModalRef
  @Input() role?: Role
  @Input() user?: User
  @Output() userChanged = new EventEmitter<User>()

  @ViewChild('submitFailure') failTemplate: TemplateRef<any>
  accountForm: FormGroup
  failModalRef: NgbModalRef

  roles: Role[] = [
    {roleId: 1, name: 'admin'},
    {roleId: 4, name: 'customer'},
    {roleId: 3, name: 'driver'}
  ]

  needSubmit: Boolean
  needRole: Boolean
  isEdit: Boolean
  message: string

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.needSubmit = (typeof this.modalRef === 'undefined')
    this.needRole = (typeof this.role === 'undefined') 
    this.isEdit = (typeof this.user !== 'undefined')

    this.accountForm = (this.isEdit) ? this.editForm() : this.blankForm()

    if (!this.needSubmit) {
      this.modalRef.result.then(
        (result) => {
          this.submit(this.failTemplate)
        },
        (reason) => {}
      )
    }
  }

  blankForm(): FormGroup {
    const form = this.fb.group({
      username: new FormControl(),
      email: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl()
    })
    if (this.needRole) {
      form.addControl('role', new FormControl())
    }
    return form
  }

  editForm(): FormGroup {
    return this.fb.group({
      username: new FormControl(this.user.username),
      email: new FormControl(this.user.email),
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName)
    })
  }

  submit(failModal: TemplateRef<any>) {
    const getRole = (): Role => {
      if (!this.needRole) {
        return this.role
      }
      if (this.isEdit) {
        return this.user.role
      }
      for (let role of this.roles) {
        if (this.accountForm.value.role === role.name) {
          console.log("Role selected: "+role.name)
          return role
        }
      }
    }
    const account: User = {
      username: this.accountForm.value.username,
      role: getRole(),
      email: this.accountForm.value.email,
      password: " ",
      firstName: this.accountForm.value.firstName,
      lastName: this.accountForm.value.lastName,
      phone: (this.isEdit) ? this.user.phone : 11111111111,
      isActive: (this.isEdit) ? this.user.isActive : false
    }
    if (this.isEdit) {
      account.userId = this.user.userId
    }
    this.sendRequest(account).then(
      (resp) => {
        console.log("Request Sent: ")
        this.userChanged.emit(resp)
        console.log(resp)
      },
      (err) => {
        console.log(err)
        switch (err.status) {
          case 404:
            this.message = "This user no longer seems to exist"
            break;
          case 409:
            this.message = "A user with this username or email already exists"
            break;
          case 500:
            this.message = 'Something went wrong with the server'
            break;
          default:
            this.message = "An unexpected error occured. Perhaps there's a problem with the connection"
        }
        this.failModalRef = this.modalService.open(this.failTemplate)
      }
    )
  }

  sendRequest(user: User): Promise<User> {
    if (this.isEdit) {
      return new Promise((resolve, reject) => {
        this.service.updateUser(user).then(
          (resp) => {
            resolve(resp.body)
          },
          (err) => {
            reject(err)
          })
        })
    } else {
      return this.service.registerUser(user)
    }
  }
}
