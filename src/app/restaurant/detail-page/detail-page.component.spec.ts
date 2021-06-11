import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

import { DetailPageComponent } from './detail-page.component';

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;
  
  let serviceSpy = jasmine.createSpyObj('RestaurantService', ['getRestaurant'])

  const testRestaurant: Restaurant =
    {
      restaurantId: '26',
      name: "Test",
      cuisine: "Test",
      location: {
        locationId: '0',
        unit: '0',
        street: "Somewhere",
        city: "Somewhere",
        state: "Somewhere",
        zipCode: 0
      },
      managers: [],
      foods: []
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPageComponent ],
      providers: [
        {provide: RestaurantService, useValue: serviceSpy},
        {provide: Router, useValue: RouterTestingModule},
        {provide: ActivatedRoute, useValue: {
          params: of({id: 26}),
          snapshot: {
            paramMap: {
              get(name: string) {return 26}
            }
          }
        }}
      ]
    })
    .compileComponents();
    serviceSpy = TestBed.inject(RestaurantService)
    // const router = TestBed.get(Router)
    const route = TestBed.inject(ActivatedRoute)
    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    
  });

  it('should create', () => {
    serviceSpy.getRestaurant.and.returnValue(of(testRestaurant))
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(serviceSpy.getRestaurant).toHaveBeenCalledWith(26)
  });

  it('should display restaurant details', () => {
    serviceSpy.getRestaurant.and.returnValue(of(testRestaurant))
    fixture.detectChanges();
    const name = fixture.nativeElement.querySelector('h3')
    expect(name.textContent).toEqual('Test')
  })

  it('should display error details on failure', () => {
    serviceSpy.getRestaurant.and.returnValue(throwError({status: 404}))
    fixture.detectChanges();
    const message = fixture.nativeElement.querySelector('p')
    expect(message.textContent).toContain('seem to exist')
  })
});
