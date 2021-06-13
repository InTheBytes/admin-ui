import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { BrowseOrderComponent } from './browse-order/browse-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderService } from '../shared/services/order.service';
import { TableModule } from '../table/table.module';
import { OrderSelectorComponent } from './order-selector/order-selector.component';
import { PipesModule } from '../pipes/pipes.module';
import { AppRoutingModule } from '../app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DestinationFormComponent } from './destination-form/destination-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { PortalModule } from '@angular/cdk/portal';




@NgModule({
  declarations: [
    OrderComponent,
    BrowseOrderComponent,
    OrderDetailsComponent,
    OrderSelectorComponent,
    DestinationFormComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    PipesModule,
    AppRoutingModule,
    PortalModule,
    FormsModule,

    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxMatTimepickerModule
  ],
  providers: [
    OrderService,
    FormBuilder
  ],
  exports: [
    OrderComponent,
    BrowseOrderComponent,
    OrderDetailsComponent,
    DestinationFormComponent
  ]
})
export class OrderModule { }
