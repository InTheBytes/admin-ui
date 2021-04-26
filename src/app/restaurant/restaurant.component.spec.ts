import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantComponent } from './restaurant.component';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render routerLinks', () => {
    
  })

  it('should route to create restaurant with button', () => {

  })

  it('should route to restaurant listings with button', () => {

  })
});
