import { TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { DetailPageComponent } from '../detail-page/detail-page.component';

import { CreatorComponent } from './creator.component';

describe('CreatorComponent', () => {
  let component: CreatorComponent;
  let fixture: ComponentFixture<CreatorComponent>;

  let serviceSpy = jasmine.createSpyObj('RestaurantService', ['createRestaurant'])
  let routerSpy = jasmine.createSpyObj('Router', ['navigate'])

  const testRestaurant: Restaurant =
    {
      restaurantId: "26",
      name: "Test",
      cuisine: "Test",
      location: {
        locationId: "0",
        unit: '0',
        street: "Somewhere",
        city: "Somewhere",
        state: "Somewhere",
        zipCode: 0
      },
      foods: [],
      managers: []
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorComponent ],
      // imports: [RouterTestingModule],
      providers: [ 
        {provide: RestaurantService, useValue: serviceSpy },
        {provide: Router, useValue: routerSpy},
        FormBuilder,
        NgbModal
      ]
    })
    .compileComponents();
    serviceSpy = TestBed.inject(RestaurantService)
    routerSpy = TestBed.inject(Router)
    fixture = TestBed.createComponent(CreatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize restaurant form', () => {
    fixture.detectChanges()
    expect(component.restaurantForm).toBeTruthy()
    expect(component.restaurantForm).toBeDefined()
  })

  it('should call create on submission', () => {
    let buttonElement = fixture.debugElement.query(By.css('button'));
    
    spyOn(component, 'saveRestaurant');
    buttonElement.triggerEventHandler('click', null);
    expect(component.saveRestaurant).toHaveBeenCalled();
  })

  it('should redirect to details on successful creation', () => {
    serviceSpy.createRestaurant.and.returnValue(of(testRestaurant))
    const makeSpy = spyOn(component, 'makeRestaurant').and.returnValue(testRestaurant)

    component.saveRestaurant(null)

    expect(makeSpy).toHaveBeenCalled()
    expect(serviceSpy.createRestaurant).toHaveBeenCalled()
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/restaurants/', 26])
  })

  it('should return null with incomplete makeRestaurant form', () => {
    fixture.detectChanges()
    expect(component.makeRestaurant()).toEqual(null)
  })

  it('should pop-up fail module with unfinished form', () => {
    const makeSpy = spyOn(component, 'makeRestaurant').and.returnValue(null)
    let buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', null);
    
    expect(component.modalRef).toBeTruthy()
    expect(component.failMessage).toContain('all of the fields')
  })

  it('should pop-up fail modal with service error', () => {
    const makeSpy = spyOn(component, 'makeRestaurant').and.returnValue(testRestaurant)
    serviceSpy.createRestaurant.and.returnValue(throwError({status: 409}))
    let buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', null);
    
    expect(component.modalRef).toBeTruthy()
    expect(component.failMessage).toContain('already exists')
  })
});
