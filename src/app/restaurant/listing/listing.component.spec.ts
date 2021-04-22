import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Observable, throwError, of } from 'rxjs';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

import { ListingComponent } from './listing.component';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  let serviceStub = jasmine.createSpyObj('RestaurantService', ['getAllRestaurants', 'deleteRestaurant'])

  const testRestaurant: Restaurant =
    {
      restaurantId: 26,
      name: "Test",
      cuisine: "Test",
      location: {
        locationId: 0,
        unit: '0',
        street: "Somewhere",
        city: "Somewhere",
        state: "Somewhere",
        zipCode: 0
      }
    }

  const testObservable: Observable<Restaurant[]> = 
  Observable.create(function (observer) {
    observer.next([testRestaurant])
    observer.complete()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [ HttpClientTestingModule ],
      providers: [ 
        ListingComponent,
        { provide: RestaurantService, useValue: serviceStub },
        FormBuilder,
        NgModule
      ]
    })
    .compileComponents();
    serviceStub = TestBed.inject(RestaurantService)
    component = TestBed.inject(ListingComponent)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize values', () => {
    let initializeRestaurants = spyOn(component, 'initializeRestaurants')
    let initializeForms = spyOn(component, 'initializeForms')
    component.ngOnInit();
    expect(component.message).toEqual("Loading...")
    expect(component.loaded).toEqual(false)
    expect(component.page).toEqual(1)
    expect(initializeRestaurants).toHaveBeenCalled()
    expect(initializeForms).toHaveBeenCalled()
  })

  it('should initialize restaurant lists', () => {
    serviceStub.getAllRestaurants.and.returnValue(testObservable)
    component.initializeRestaurants()
    expect(component.restaurantsMaster).toEqual([testRestaurant])
    expect(component.restaurants).toEqual([testRestaurant])
    expect(component.pageSize).toEqual(1)
    expect(component.loaded).toEqual(true)
  })

  it('should account for 404 error initializing restaurants', () => {
    serviceStub.getAllRestaurants.and.returnValue(throwError({error: {status: 404}}))
    component.initializeRestaurants()
    expect(component.restaurantsMaster).toBeUndefined()
    expect(component.restaurants).toBeUndefined()
    expect(component.message).toContain("any restaurants")
    expect(component.loaded).toBeUndefined()
  })

  it('should account for 500 error initializing restaurants', () => {
    serviceStub.getAllRestaurants.and.returnValue(throwError({error: {status: 500}}))
    component.initializeRestaurants()
    expect(component.restaurantsMaster).toBeUndefined()
    expect(component.restaurants).toBeUndefined()
    expect(component.message).toContain("server")
    expect(component.loaded).toBeUndefined()
  })

  it('should account for unexpected errors initializing restaurants', () => {
    serviceStub.getAllRestaurants.and.returnValue(throwError({error: {status: 409}}))
    component.initializeRestaurants()
    expect(component.restaurantsMaster).toBeUndefined()
    expect(component.restaurants).toBeUndefined()
    expect(component.message).toContain("unexpected")
    expect(component.loaded).toBeUndefined()
  })

  it('should initialize the forms', () => {
    component.initializeForms()
    expect(component.searchRestaurantForm).toBeTruthy()
    expect(component.deleteRestaurantForm).toBeTruthy()
  })

  it('should include restaurants matching the search', () => {
    serviceStub.getAllRestaurants.and.returnValue(testObservable)
    component.ngOnInit()
    component.searchRestaurantForm.value.searchString = "est"
    component.searchRestaurants()
    expect(component.restaurants).toContain(testRestaurant);
  })

  it("should exclude restaurants that don't match the search", () => {
    serviceStub.getAllRestaurants.and.returnValue(testObservable)
    component.ngOnInit()
    component.searchRestaurantForm.value.searchString = "q"
    component.searchRestaurants()
    expect(component.restaurants).not.toContain(testRestaurant);
  })
});
