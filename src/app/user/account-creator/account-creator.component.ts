import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-account-creator',
  templateUrl: './account-creator.component.html',
  styleUrls: ['./account-creator.component.css']
})
export class AccountCreatorComponent implements OnInit {

  @Input() modalRef?: NgbModal
  @Input() role?: string

  accountForm: FormGroup
  roles: String[] = ['customer', 'driver', 'admin']
  needSubmit: Boolean
  needRole: Boolean

  constructor(
    private fb: FormBuilder,
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.needSubmit = (typeof this.modalRef === 'undefined')
    this.needRole = (typeof this.role === 'undefined') 

    this.accountForm = this.fb.group({
      username: new FormControl(),
      email: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl()
    })

    if (this.needRole) {
      this.accountForm.addControl('role', new FormControl())
    }
  }

  createAccount() {
    const account: User = {
      userId: null,
      username: this.accountForm.value.username,
      role: {
        roleId: null,
        name: (this.needRole) ? this.accountForm.value.role : this.role
      },
      email: this.accountForm.value.email,
      firstName: this.accountForm.value.firstName,
      lastName: this.accountForm.value.lastName,
      phone: null,
      isActive: false
    }
  }

}
