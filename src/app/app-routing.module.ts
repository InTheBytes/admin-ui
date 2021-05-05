import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowseRestaurantComponent } from './restaurant/browse-restaurant/browse-restaurant.component';
import { CreatorComponent } from './restaurant/creator/creator.component';
import { DetailPageComponent } from './restaurant/detail-page/detail-page.component';
import { ListingComponent } from './restaurant/listing/listing.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
 
const routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
    },
    {
        path: 'restaurants',
        component: RestaurantComponent,
        children: [
            {
                path: 'creator',
                component: CreatorComponent
            },
            {
                path: 'listing',
                component: BrowseRestaurantComponent,
            },
            {
                path: ':restaurantId',
                component: DetailPageComponent
            }
          ]
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }