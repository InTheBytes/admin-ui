import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRestaurantComponent } from './browse-restaurant.component';

describe('BrowseRestaurantComponent', () => {
  let component: BrowseRestaurantComponent;
  let fixture: ComponentFixture<BrowseRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
