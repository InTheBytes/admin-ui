import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowseRestaurantComponent } from './restaurant/browse-restaurant/browse-restaurant.component';
import { CreatorComponent } from './restaurant/creator/creator.component';
import { DetailPageComponent } from './restaurant/detail-page/detail-page.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AccountCreatorComponent } from './user/account-creator/account-creator.component';
import { AllUsersComponent } from './user/all-users/all-users.component';
import { BrowseUserComponent } from './user/browse-user/browse-user.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserComponent } from './user/user.component';
 
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
    },
    {
      path: 'users',
      component: UserComponent,
      children: [
        {
          path: '',
          component: BrowseUserComponent
        },
        {
          path: 'all',
          component: AllUsersComponent
        },
        {
          path: 'register',
          component: AccountCreatorComponent
        },
        {
          path: ':userId',
          component: UserDetailsComponent
        }
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }