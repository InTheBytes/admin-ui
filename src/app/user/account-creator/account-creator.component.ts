import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Role, User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-account-creator',
  templateUrl: './account-creator.component.html',
  styleUrls: ['./account-creator.component.css']
})
export class AccountCreatorComponent implements OnInit {

  @Input() modalRef?: NgbModalRef
  @Input() role?: string
  @Input() user?: User

  accountForm: FormGroup

  roles: Role[] = [
    {roleId: 1, name: 'admin'},
    {roleId: 3, name: 'customer'},
    {roleId: 4, name: 'driver'}
  ]

  needSubmit: Boolean
  needRole: Boolean
  isEdit: Boolean

  constructor(
    private fb: FormBuilder,
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.needSubmit = (typeof this.modalRef === 'undefined')
    this.needRole = (typeof this.role === 'undefined') 
    this.isEdit = (typeof this.user !== 'undefined')

    this.accountForm = (this.isEdit) ? this.editForm() : this.blankForm()

    if (!this.needSubmit) {
      this.modalRef.result.then(
        (result) => {
          this.submit()
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

  submit() {
    const getRole = (): Role => {
      for (let role of this.roles) {
        if (this.accountForm.value.role === role.name) {
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
      phone: 11111111111,
      isActive: false
    }
    this.service.registerUser(account)
  }
}
