import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/model/user';
import { ApiService } from 'src/app/shared/services/backend-core/api.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup
  user: User
  username: string
  password: string
  modalRef: NgbModalRef
  failMessage: string

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private api: ApiService
    ) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(this.username),
      password: new FormControl(this.password),
    })
  }

  checkForm(): boolean {
    let u: string = this.loginForm.value.username
    let p: string = this.loginForm.value.password
    return (u != null && u != '' && typeof u !== 'undefined' &&
      p != null && p != '' && typeof p !== 'undefined')
  }

  login(failModal: TemplateRef<any>) {
    if (this.checkForm()) {
      this.api.login(this.loginForm.value.username, this.loginForm.value.password).then(
        (value) => {
          (value) ? this.router.navigate(['']) : this.fail("Username or password incorrect", failModal)
        },  (err) => {
          this.fail("Login failed", failModal)
        }
      )
    } else {
      this.fail("Please enter information for all of the fields", failModal)
    }
  }

  fail(message: string, failModal: TemplateRef<any>) {
    this.failMessage = message;
    this.modalRef = this.modalService.open(failModal)
  }
}
