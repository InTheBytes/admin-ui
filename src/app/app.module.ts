import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CreatorComponent } from './restaurant/creator/creator.component';
import { RestaurantService } from './shared/services/restaurant.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailPageComponent } from './restaurant/detail-page/detail-page.component';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './register/form/form.component';
import { LoginFormComponent } from './login/form/loginform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AccountCreatorComponent } from './user/account-creator/account-creator.component';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { BrowseOrderComponent } from './order/browse-order/browse-order.component';
import { AllUsersComponent } from './user/all-users/all-users.component';
import { BrowseUserComponent } from './user/browse-user/browse-user.component';
import { BrowseRestaurantComponent } from './restaurant/browse-restaurant/browse-restaurant.component';
import { ListingComponent } from './shared/component/listing/listing.component';
import { AddressPipe } from './shared/pipes/address-pipe';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    HomeComponent,
    CreatorComponent,
    ListingComponent,
    BrowseRestaurantComponent,
    DetailPageComponent,
    UserComponent,
    AddressPipe,
    
    BrowseUserComponent,
    UserDetailsComponent,
    AllUsersComponent,
    RegisterComponent,
    LoginComponent,
    FormComponent,
    LoginFormComponent,
    AccountCreatorComponent,
    OrderComponent,
    OrderDetailsComponent,
    BrowseOrderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  exports: [
    AddressPipe
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
