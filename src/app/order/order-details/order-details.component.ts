import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LineItem, Order } from 'src/app/shared/model/order';
import { Page } from 'src/app/shared/model/page';
import { Listable } from 'src/app/table/table.component';
import { OrderWizardService } from '../order-wizard.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [OrderWizardService],
})
export class OrderDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('displayInfo') viewInfoTemplateContent: TemplateRef<any>;
  @ViewChild('saveFailedModal') saveFailedTemplateContent: TemplateRef<any>;

  viewInfoPortal: TemplatePortal<any>;
  selectedTemplate: Portal<any>;

  hasFailed: boolean = false;
  message: string;
  order: Order = { customer: {}, items: [] };
  menuConfig: Listable;

  isLoaded: boolean;
  changesPending: boolean;
  modalRef: NgbModalRef;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private service: OrderWizardService,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngAfterViewInit() {
    this.viewInfoPortal = new TemplatePortal(
      this.viewInfoTemplateContent,
      this._viewContainerRef
    );
    this.displayInfo();
  }

  ngOnInit(): void {
    this.service
      .setOrder(this.actRoute.snapshot.paramMap.get('orderId'))
      .then((x) => {
        this.refresh();
        this.isLoaded = true;
        this.menuConfig = {
          idProperty: 'foodId',
          nameProperty: 'name',
          columns: [
            { property: 'quantity', column: 'Qty.' },
            { property: 'name', column: 'Item' },
            { property: 'price', column: 'Price' },
          ],
          get: this.getItems,
        };
      }, this.catchError);
  }

  displayInfo() {
    this.selectedTemplate = this.viewInfoPortal;
  }

  changePortalTemplate(template: TemplateRef<any>) {
    this.selectedTemplate = new TemplatePortal(
      template,
      this._viewContainerRef
    );
  }

  refresh = () => {
    this.order = this.service.order;
  };

  catchError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 404:
        this.message = 'Order not found';
        break;
      default:
        this.message = 'Something went wrong';
    }
    this.hasFailed = true;
  }

  getItems = (page: number, pageSize: number): Promise<Page<LineItem>> => {
    return new Promise((resolve) => {
      let page: Page<LineItem> = {
        content: this.order.items,
        size: this.order.items.length,
        totalElements: this.order.items.length,
        totalPages: 1,
        number: 0,
      };
      resolve(page);
    });
  };

  editClick(changesMade: boolean) {
    if (changesMade) {
      this.refresh();
      this.displayInfo();
      this.changesPending = true;
    }
  }

  submitChanges() {
    this.service.submit().then(
      (resp) => {
        this.service.order = resp;
        console.log(resp)
        // console.log(.status)
        this.service.changeStatus(resp.status)
        this.changesPending = false;
      },
      (err) => {
        this.modalRef = this.modalService.open(this.saveFailedTemplateContent);
      }
    );
  }
}
