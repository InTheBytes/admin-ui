import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { BrowseOrderComponent } from './browse-order/browse-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderService } from '../shared/services/order.service';
import { TableModule } from '../table/table.module';
import { PipesModule } from '../pipes/pipes.module';
import { AppRoutingModule } from '../app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PortalModule } from '@angular/cdk/portal';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  declarations: [
    OrderComponent,
    BrowseOrderComponent,
    OrderDetailsComponent,
    DetailFormComponent
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
    MatNativeDateModule
  ],
  providers: [
    OrderService,
  ],
  exports: [
    OrderComponent,
    BrowseOrderComponent,
    OrderDetailsComponent
  ]
})
export class OrderModule { }
