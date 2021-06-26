import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { BrowseRestaurantComponent } from './browse-restaurant.component';

describe('BrowseRestaurantComponent', () => {
  let component: BrowseRestaurantComponent;
  let fixture: ComponentFixture<BrowseRestaurantComponent>;

  let mockRouter = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseRestaurantComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: Router, useValue: mockRouter}
      ]
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
