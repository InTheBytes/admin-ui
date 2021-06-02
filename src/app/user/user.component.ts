import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild("creationModal") createTemplate: TemplateRef<any>

  modalRef: NgbModalRef
  message: string

  createClicked: boolean

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.createClicked = false
  }

  clickCreate() {
    this.modalRef = this.modalService.open(this.createTemplate)
    this.createClicked = true
  }

  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content)
    this.modalRef.result.then(
      (result) => {
        
      },
      (reason) => { }
    )
  }

}
