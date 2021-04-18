import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatorComponent } from './restaurant/creator/creator.component';
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
                component: ListingComponent
            }
          ]
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }