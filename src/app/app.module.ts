import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CreatorComponent } from './restaurant/creator/creator.component';
// import { ListingComponent } from './restaurant/listing/listing.component';
import { RestaurantService } from './shared/services/restaurant.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailPageComponent } from './restaurant/detail-page/detail-page.component';
import { BrowseRestaurantComponent } from './restaurant/browse-restaurant/browse-restaurant.component';
import { ListingComponent } from './shared/component/listing/listing.component';
import { UserComponent } from './user/user.component';
import { BrowseUserComponent } from './user/browse-user/browse-user.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { AllUsersComponent } from './user/all-users/all-users.component';
import { RegisterComponent } from './register/register.component';
import { FormComponent } from './register/form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    HomeComponent,
    CreatorComponent,
    ListingComponent,
    BrowseRestaurantComponent,
    DetailPageComponent,
    BrowseRestaurantComponent,
    UserComponent,
    BrowseUserComponent,
    UserDetailsComponent,
    AllUsersComponent,
    RegisterComponent,
    FormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    MatSliderModule,
    BrowserAnimationsModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
