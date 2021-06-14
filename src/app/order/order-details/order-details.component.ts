import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ComponentRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineItem, Order } from 'src/app/shared/model/order';
import { Page } from 'src/app/shared/model/page';
import { Listable } from 'src/app/table/table.component';
import { DestinationFormComponent } from '../destination-form/destination-form.component';
import { OrderWizardService } from '../order-wizard.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [ OrderWizardService ]
})
export class OrderDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('displayInfo') viewInfoTemplateContent: TemplateRef<any>
  @ViewChild('purchaseDetails') viewPurchaseTemplateContent: TemplateRef<any>
  @ViewChild('editComponent') editDetailsComponent: ComponentRef<DestinationFormComponent>

  selectedTemplate: Portal<any>
  
  viewInfoPortal: TemplatePortal<any>
  viewPurchasePortal: TemplatePortal<any>
  editPortal: ComponentPortal<DestinationFormComponent>
  
  hasFailed: boolean = false
  message: string
  order: Order = {customer: {}, items: []}
  menuConfig: Listable

  isLoaded: boolean
  infoOnDisplay: boolean
  templatePortal: TemplatePortal<any>;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private service: OrderWizardService,
    private actRoute: ActivatedRoute
  ) { }

  ngAfterViewInit() {
    this.viewInfoPortal = new TemplatePortal(this.viewInfoTemplateContent, this._viewContainerRef);
    this.viewPurchasePortal = new TemplatePortal(this.viewPurchaseTemplateContent, this._viewContainerRef);
    // this.editPortal = new ComponentPortal(this.editDetailsComponent.inject(this.order))
  }

  ngOnInit(): void {
    this.service.setOrder(this.actRoute.snapshot.paramMap.get("orderId")).then(
      (x) => { 
        this.refresh()
        this.isLoaded = true
        this.infoOnDisplay = true
        this.menuConfig = {
          idProperty: 'foodId',
          nameProperty: 'name',
          columns: [
            {property: 'quantity', column: "Qty."},
            {property: 'name', column: 'Item'},
            {property: 'price', column: 'Price'}
          ],
          get: this.getItems
        }
      }, this.catchError
    )
  }

  changePortalTemplate(template: TemplateRef<any>) {
    this.templatePortal = new TemplatePortal(template, this._viewContainerRef)
  }

  refresh = () => {this.order = this.service.order}

  catchError(err: HttpErrorResponse): void {
    switch(err.status) {
      case 404:
        this.message = 'Order not found'
        break;
      default:
        this.message = 'Something went wrong'
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
        number: 0
      }
      resolve(page)
    })
  }

  editClick(arg: boolean) {this.infoOnDisplay = !arg}

}