import { TestBed } from '@angular/core/testing';
import { RestaurantService } from './restaurant.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Restaurant } from '../model/restaurant';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let httpTestControl: HttpTestingController
  const baseUrl: string = 'http://localhost:8080/apis/restaurant'

  const result1: Restaurant = {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
         HttpClientTestingModule 
        ]
    });
    httpTestControl = TestBed.inject(HttpTestingController)
    service = TestBed.inject(RestaurantService)
  });

  afterEach(() => {
    httpTestControl.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all restaurants', () => {
    const result2: Restaurant = {
      restaurantId: 26,
      name: "Test 2",
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
    service.getAllRestaurants().subscribe((resp) => {
      expect(resp).toEqual([result1, result2])
    })
    const req = httpTestControl.expectOne(baseUrl)
    expect(req.request.method).toEqual('GET')
    req.flush([result1, result2])
  })

  it('should return a restaurant', () => {
    service.getRestaurant(26).subscribe((resp) => {
      expect(resp).toEqual(result1)
    })
    const req = httpTestControl.expectOne(`${baseUrl}/26`);
    expect(req.request.method).toEqual('GET')
    req.flush(result1)
  })

  it('should create and return a restaurant', () => {
    service.createRestaurant(result1).subscribe((resp) => {
      expect(resp).toEqual(result1)
    })
    const req = httpTestControl.expectOne(baseUrl)
    expect(req.request.method).toEqual('POST')
    const headers = {'location': '26'}
    req.flush(result1)
  })

  it('should update a restaurant', () => {
    service.updateRestaurant(result1).subscribe((resp) => {})
    const req = httpTestControl.expectOne(`${baseUrl}/26`)
    expect(req.request.method).toEqual('PUT')
    req.flush(result1)
  })

  it('should delete a restaurant', () => {
    service.updateRestaurant(result1).subscribe((resp) => {})
    const req = httpTestControl.expectOne(`${baseUrl}/26`)
    expect(req.request.method).toEqual('PUT')
    req.flush('')
  })

});
