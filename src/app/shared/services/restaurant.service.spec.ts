import { TestBed } from '@angular/core/testing';
import { RestaurantService } from './restaurant.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('RestaurantService', () => {
  let service: RestaurantService;
  // let valueServiceSpy: jasmine.SpyObj<ValueService>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
         HttpClientTestingModule 
        ]
    });
    service = TestBed.inject(RestaurantService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
