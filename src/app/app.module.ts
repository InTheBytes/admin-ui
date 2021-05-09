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
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
