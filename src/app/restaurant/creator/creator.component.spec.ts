import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

import { CreatorComponent } from './creator.component';

describe('CreatorComponent', () => {
  let component: CreatorComponent;
  let fixture: ComponentFixture<CreatorComponent>;

  let serviceSpy = jasmine.createSpyObj('RestaurantService', ['createRestaurant'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorComponent ],
      providers: [ 
        {provide: RestaurantService, useValue: serviceSpy },
        {provide: Router, useValue: RouterTestingModule},
        FormBuilder,
        NgbModal
      ]
    })
    .compileComponents();
    serviceSpy = TestBed.inject(RestaurantService)
    fixture = TestBed.createComponent(CreatorComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize restaurant form', () => {

  })

  it('should redirect to details on submission', () => {

  })

  it('should pop-up fail module with unfinished form', () => {
    
  })

  it('should pop-up fail modal with service error', () => {

  })
});
