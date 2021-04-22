import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
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
      declarations: [ ListingComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ 
        { provide: RestaurantService, useValue: serviceStub },
        FormBuilder,
        NgModule
      ]
    })
    .compileComponents();
    serviceStub = TestBed.inject(RestaurantService)
    fixture = TestBed.createComponent(ListingComponent)
    component = fixture.componentInstance
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined()
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

  it('should catch and distinguish errors initializing restaurants', () => {
    serviceStub.getAllRestaurants.and.returnValue(throwError({error: {status: 404}}))
    component.initializeRestaurants()
    expect(component.restaurantsMaster).toBeUndefined()
    expect(component.restaurants).toBeUndefined()
    expect(component.message).toContain("any restaurants")
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
    component.restaurantsMaster = [testRestaurant]
    component.initializeForms()
    component.searchRestaurantForm.value.searchString = "q"
    component.searchRestaurants()
    expect(component.restaurants).not.toContain(testRestaurant);
  })

  it("should delete a restaurant", () => {
    serviceStub.deleteRestaurant.and.returnValue(new Observable())
    component.deleteRestaurant(26, null, 0)
    expect(serviceStub.deleteRestaurant).toHaveBeenCalledWith(26)
  })

  it("should update list on restaurant deletion", () => {
    serviceStub.deleteRestaurant.and.returnValue(of({}))
    component.restaurantsMaster = [testRestaurant]
    let searchRestaurants = spyOn(component, 'searchRestaurants')

    component.deleteRestaurant(26, null, 0)
    expect(component.restaurantsMaster).toHaveSize(0)
    expect(searchRestaurants).toHaveBeenCalled()
  })

  it("should start with loading message", () => {
    spyOn(component, 'initializeRestaurants')
    spyOn(component, 'initializeForms')
    fixture.detectChanges()
    const h4 = fixture.nativeElement.querySelector('h4');
    expect(h4.textContent).toEqual("Loading...")
  })

  it("should display message with failed loading", () => {
    serviceStub.getAllRestaurants.and.returnValue(throwError({error: {status: 404}}))
    fixture.detectChanges()
    const h4 = fixture.nativeElement.querySelector('h4');
    expect(h4.textContent).toContain("any restaurants")
  })

  it("should display table with successful loading", () => {
    serviceStub.getAllRestaurants.and.returnValue(testObservable)
    fixture.detectChanges()
    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeDefined()
  })

  it("should populate table with restaurants", () => {
    serviceStub.getAllRestaurants.and.returnValue(testObservable)
    fixture.detectChanges()
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows[1].cells[1].innerHTML).toContain('Test')
  })

  it("should pop-up to catch bad confirmation on deletion", () => {

  })

  it("should pop-up to catch and distinguish errors on restaurant deletion", () => {

  })

  it("should open deletion modal with delete button", () => {

  })

  it("should open error modal with failed deletion", () => {

  })

  it("should route to details component with view button", () => {

  })
});
