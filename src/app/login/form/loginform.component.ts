import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
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

  // loginUser(failModal: TemplateRef<any>) { 
  //   if (this.makeUser() === null) {
  //     this.failMessage = "Please enter information for all of the fields"
  //     this.modalRef = this.modalService.open(failModal)
  //   } else {
  //     this.user = this.makeUser()
  //     this.userService.loginUser(this.user),
  //     (error) => {
  //       switch (error.status) {
  //         case 409:
  //           this.failMessage =
  //           "Login failed"
  //           break;
  //         case 500:
  //           this.failMessage = 'Something went wrong with the server'
  //           break;
  //         default:
  //           this.failMessage = 
  //           "An unexpected error occured. Perhaps there's a problem with the connection"
  //       }
  //       this.modalRef = this.modalService.open(failModal)
  //     };
  //   }
  // }

  // makeUser(): User {
  //   if (this.loginForm.value.username == null || 
  //     this.loginForm.value.password == null) {
  //       return null
  //     }
  //   return {
  //     userId: "0",
  //     username: this.loginForm.value.username,
  //     email: "",
  //     firstName: "",
  //     lastName: "",
  //     phone: null,
  //     password: this.loginForm.value.password,
  //     isActive: false,
  //     role: {roleId: "4", name: 'admin'}
  //   }
  // }

  // saveUser(){}
}
