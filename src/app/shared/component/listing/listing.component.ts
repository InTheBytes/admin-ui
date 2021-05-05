import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { getFunction, PaginationService } from '../../services/pagination.service';

type deleteFunction = (id: number) => Observable<HttpResponse<Object>>
type selectFunction = (item: Object) => void
type errorHandler = (err: any) => void | string

type mapping = {
  property: string,
  column: string
}
export type Listable = {
  idProperty: string
  nameProperty: string
  columns: mapping[]
  get: getFunction
  getError?: errorHandler
  searchable?: string[]
  detailRoute?: string
  delete?: deleteFunction
  deleteError?: errorHandler
  select?: selectFunction
}

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  @Input() configuration: Listable
  @Input() pageSize: number

  selectEnabled: boolean
  searchEnabled: boolean
  deleteEnabled: boolean
  hasDetailsLink: boolean
  customGetHandler: boolean
  customDeleteHandler: boolean

  totalPages: number
  page: Object[]
  currentPage: number

  table: string
  colHeader: string
  details: string

  searchForm: FormGroup
  searchString: string

  modalRef: NgbModalRef
  deleteForm: FormGroup
  deleteName: string
  deleteId: any
  deleteConfirm: string
  failMessage: string

  constructor(
    private pager: PaginationService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.checkSettings()
    this.renderData()
    this.constructTable()
  }

  private checkSettings(): void {
    const map = [
      {flag: "selectEnabled", config: "select"},
      {flag: "searchEnabled", config: "searchable"},
      {flag: "hasDetailsLink", config: "detailRoute"},
      {flag: "deleteEnabled", config: "delete"},
      {flag: "customGetHandler", config: "getError"},
      {flag: "customDeleteHandler", config: "deleteError"}
    ]
    map.forEach((x) => {
      this.checkConfig(x.flag, x.config)
    })
  }

  private checkConfig(boolName: string, configName: string) {
    this[boolName] = (typeof this.configuration[configName] !== 'undefined') ? true : false
  }

  private renderData(): void {
    try {
      this.page = this.pager.initialize(this.configuration.get, this.pageSize)
    } catch (err) {
      if (this.customGetHandler) {
        this.configuration.getError(err)
      }
    }
    this.totalPages = this.pager.totalPages
  }

  constructTable(): void {
    this.configuration.columns.forEach((col) => {
      this.colHeader += `
        <th scope="col">${col.column}</th>
      `})
    this.configuration.columns.forEach((x) => {
      this.table += `
        <td>
          {{item.${x.property}}}
        </td>
      `})
    this.details = `${this.configuration.detailRoute}/${this.configuration.idProperty}`
  }

  initializeForms() {
    this.searchForm = new FormGroup({
      searchString: new FormControl(this.searchString, [
        Validators.maxLength(35),
      ]),
    });
    this.deleteForm = new FormGroup({
      deleteId: new FormControl(this.deleteId, [Validators.required]),
      deleteName: new FormControl(this.deleteName, [Validators.required]),
      deleteConfirm: new FormControl(this.deleteConfirm, [Validators.required]),
    });
  }

  onPageChange(): void {
    this.page = this.pager.changePage(this.currentPage)
    this.pageSize = this.page.length
  }

  search(): void {
    // this.page = this.pager.search()
  }

  select(item: Object): void {
    this.configuration.select(item)
  }

  open(content: TemplateRef<any>, fail: TemplateRef<any>, obj: Object, index: number): void {

    this.deleteForm = this.fb.group({
      deleteId: obj[this.configuration.idProperty],
      deleteName: obj[this.configuration.nameProperty],
      deleteConfirm: '',
    });
    this.deleteName = obj[this.configuration.nameProperty];

    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        if (this.deleteForm.value.deleteConfirm === this.deleteName) {
          this.delete(obj[this.configuration.idProperty], fail, index);
        } else {
          this.failMessage = `The ${this.configuration.nameProperty.toLowerCase()} you entered did not match`
          this.modalRef = this.modalService.open(fail)
        }
      },
      (reason) => {}
    );
  }

  delete(id: number, failModal: TemplateRef<any>, index: number) {
    this.configuration.delete(id).subscribe(
      (resp) => {
        this.onPageChange()
      },
      (err) => {
        if (this.customDeleteHandler) {
          let holder: any
          holder = this.configuration.deleteError(err)
          this.failMessage = (typeof holder === 'string') ? holder : null ;
        } else {
          this.failMessage = 
            "An unexpected error occured. Perhaps there's a problem with the connection"
        }
        this.modalRef = this.modalService.open(failModal)
      });
  }
}
