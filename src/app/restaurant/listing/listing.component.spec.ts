import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Observable, throwError, of } from 'rxjs';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ListingComponent } from './listing.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  // let routerSpy = jasmine.createSpyObj('Router', [])

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

  let serviceSpy = jasmine.createSpyObj('RestaurantService', ['getAllRestaurants', 'deleteRestaurant'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ 
        { provide: RestaurantService, useValue: serviceSpy },
        FormBuilder,
        NgModule, 
        RouterLinkWithHref
      ]
    })
    .compileComponents();
    serviceSpy = TestBed.inject(RestaurantService)
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
    serviceSpy.getAllRestaurants.and.returnValue(testObservable)
    component.initializeRestaurants()
    expect(component.restaurantsMaster).toEqual([testRestaurant])
    expect(component.restaurants).toEqual([testRestaurant])
    expect(component.pageSize).toEqual(1)
    expect(component.loaded).toEqual(true)
  })

  it('should catch and distinguish errors initializing restaurants', () => {
    serviceSpy.getAllRestaurants.and.returnValue(throwError({error: {status: 404}}))
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
    serviceSpy.getAllRestaurants.and.returnValue(testObservable)
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
    serviceSpy.deleteRestaurant.and.returnValue(new Observable())
    component.deleteRestaurant(26, null, 0)
    expect(serviceSpy.deleteRestaurant).toHaveBeenCalledWith(26)
  })

  it("should update list on restaurant deletion", () => {
    serviceSpy.deleteRestaurant.and.returnValue(of({}))
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
    serviceSpy.getAllRestaurants.and.returnValue(throwError({error: {status: 404}}))
    fixture.detectChanges()
    const h4 = fixture.nativeElement.querySelector('h4');
    expect(h4.textContent).toContain("any restaurants")
  })

  it("should display table with successful loading", () => {
    serviceSpy.getAllRestaurants.and.returnValue(testObservable)
    fixture.detectChanges()
    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeDefined()
  })

  it("should populate table with restaurants", () => {
    serviceSpy.getAllRestaurants.and.returnValue(testObservable)
    fixture.detectChanges()
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows[1].cells[1].innerHTML).toContain('Test')
  })

  it("should open deletion modal with delete button", async () => {
    serviceSpy.getAllRestaurants.and.returnValue(testObservable)
    const open = spyOn(component, 'open').and.callThrough()
    const deleteRestaurant = spyOn(component, 'deleteRestaurant')

    fixture.detectChanges()
    const deleteButton = fixture.nativeElement.querySelector('button')
    deleteButton.click()
    expect(open).toHaveBeenCalled()
    expect(component.modalRef).toBeTruthy()
  
    const modalClose = spyOn(component.modalRef, 'close').and.callThrough()

    component.deleteRestaurantForm.value.deleteConfirm = component.deleteName
    await component.modalRef.close('')
    expect(deleteRestaurant).toHaveBeenCalled()
  })

  it("should pop-up to catch bad confirmation on deletion", async () => {
    serviceSpy.getAllRestaurants.and.returnValue(testObservable)
    const open = spyOn(component, 'open').and.callThrough()
    const deleteRestaurant = spyOn(component, 'deleteRestaurant')

    fixture.detectChanges()
    const deleteButton = fixture.nativeElement.querySelector('button')
    deleteButton.click()
    const deleteModal = component.modalRef

    component.deleteRestaurantForm.value.deleteConfirm = "Not Correct"
    await component.modalRef.close('')
    expect(deleteRestaurant).not.toHaveBeenCalled()
    expect(component.modalRef).not.toEqual(deleteModal)
   
  })

  it("should pop-up to catch and distinguish errors on deletion attempt", async () => {
    serviceSpy.deleteRestaurant.and.returnValue(throwError({status: 404}))
    serviceSpy.getAllRestaurants.and.returnValue(testObservable)

    fixture.detectChanges()
    const deleteButton = fixture.nativeElement.querySelector('button')
    deleteButton.click()
    const deleteModal = component.modalRef

    component.deleteRestaurantForm.value.deleteConfirm = component.deleteName
    await component.modalRef.close('')
    expect(component.failMessage).toContain("no longer exists anyway")
    expect(component.modalRef).not.toEqual(deleteModal)
  })

  it("should route to details component with view button", () => {
    serviceSpy.getAllRestaurants.and.returnValue(testObservable)
    fixture.detectChanges()
    const link = fixture.debugElement.query(By.css('a'))
    const routerLink = link.injector.get(RouterLinkWithHref)

    expect(routerLink['commands']).toEqual(['/restaurants/26'])
    expect(routerLink['href']).toEqual('/restaurants/26')
  })
});
