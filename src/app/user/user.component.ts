import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  modalRef: NgbModalRef
  message: string

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  open(content: TemplateRef<any>, errorModal: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content)
    this.modalRef.result.then(
      (result) => {
        
      },
      (reason) => { }
    )
  }

}
