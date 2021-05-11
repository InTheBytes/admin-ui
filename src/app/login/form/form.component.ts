import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { User } from 'src/app/shared/model/user';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  registerForm: FormGroup
  user: User
  username: string
  email: string
  password: string
  confpassword: string
  firstname: string
  lastname: string
  phone: string
  modalRef: NgbModalRef
  failMessage: string

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(this.username, {
        'validators': [Validators.minLength(3), Validators.required], 
        'updateOn':'change'}),
      email: new FormControl(this.email, {
        'validators': [Validators.minLength(3), Validators.required], 
        'updateOn':'change'}),
      password: new FormControl(this.password, {
        'validators': [Validators.required, Validators.minLength(3)], 
        'updateOn':'change'}),
      firstname: new FormControl(this.firstname, {
        'validators': [Validators.required], 
        'updateOn':'change'}),
      lastname: new FormControl(this.lastname, {
        'validators': [Validators.required], 
        'updateOn':'change'}),
      confpassword: new FormControl(this.confpassword, {
        'validators': [Validators.required],
        'updateOn':'change'}),
      phone: new FormControl(this.phone, {
        'validators': [Validators.required, Validators.maxLength(5), Validators.minLength(5)], 
        'updateOn':'change'})
    })
  }

  saveUser(failModal: TemplateRef<any>) {
    
    if (this.makeUser() === null) {
      this.failMessage = "Please enter information for all of the fields"
      this.modalRef = this.modalService.open(failModal)
    } else {
      this.user = this.makeUser()
      this.userService.registerUser(this.user),
      (error) => {
        switch (error.status) {
          case 409:
            this.failMessage =
            "It looks like this restaurant already exists"
            break;
          case 500:
            this.failMessage = 'Something went wrong with the server'
            break;
          default:
            this.failMessage = 
            "An unexpected error occured. Perhaps there's a problem with the connection"
        }
        this.modalRef = this.modalService.open(failModal)
      };
    }
  }

  makeUser(): User {
    if (this.registerForm.value.username == null || 
      this.registerForm.value.email == null || 
      this.registerForm.value.password == null ||
      this.registerForm.value.firstname == null || 
      this.registerForm.value.lastname == null || 
      this.registerForm.value.phone == null) {
        return null
      }
    return {
      userId: 0,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      firstName: this.registerForm.value.firstname,
      lastName: this.registerForm.value.lastName,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password,
      isActive: false,
      role: {roleId: 4, name: 'admin'}
    }
  }
}
