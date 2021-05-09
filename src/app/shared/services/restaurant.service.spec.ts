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
    service.getAllRestaurants(10, 1).subscribe((resp) => {
      expect(resp.body).toEqual([result1, result2])
      expect(resp.headers.get('page')).toEqual('1')
      expect(resp.headers.get('total-pages')).toEqual('1')
    })
    const req = httpTestControl.expectOne(`${baseUrl}?page-size=10&page=1`)
    expect(req.request.method).toEqual('GET')
    req.flush([result1, result2], {headers: { 'page': '1', 'total-pages': '1' }})
  });
  
  it('should return an error for getAll', () => {
    service.getAllRestaurants(10, 1).subscribe(
      (resp) => fail('did not return an error'),
      (err) => {
        expect(err.status).toEqual(404)
        expect(err.error).toEqual('Test 404')
      })
    const req = httpTestControl.expectOne(`${baseUrl}?page-size=10&page=1`)
    req.flush("Test 404", {status: 404, statusText: 'Not Found'})
  });

  it('should return a restaurant', () => {
    service.getRestaurant(26).subscribe((resp) => {
      expect(resp).toEqual(result1)
    })
    const req = httpTestControl.expectOne(`${baseUrl}/26`);
    expect(req.request.method).toEqual('GET')
    req.flush(result1)
  });

  it('should return an error for get', () => {
    service.getRestaurant(0).subscribe(
      (resp) => fail('did not return an error'),
      (err) => {
        expect(err.status).toEqual(404)
        expect(err.error).toEqual('Test 404')
      })
    const req = httpTestControl.expectOne(`${baseUrl}/0`)
    req.flush("Test 404", {status: 404, statusText: 'Not Found'})
  });

  it('should create and return a restaurant', () => {
    service.createRestaurant(result1).subscribe((resp) => {
      expect(resp).toEqual(result1)
    })
    const req = httpTestControl.expectOne(baseUrl)
    expect(req.request.method).toEqual('POST')
    const headers = {'location': '26'}
    req.flush(result1)
  });

  it('should return an conflict error for creating a restaurant', () => {
    service.createRestaurant(result1).subscribe(
      (resp) => fail('did not return an error'),
      (err) => {
        expect(err.status).toEqual(409)
        expect(err.error).toEqual('Test 409')
      })
    const req = httpTestControl.expectOne(baseUrl)
    req.flush("Test 409", {status: 409, statusText: 'Conflict'})
  });

  it('should update a restaurant', () => {
    service.updateRestaurant(result1).subscribe((resp) => {})
    const req = httpTestControl.expectOne(`${baseUrl}/26`)
    expect(req.request.method).toEqual('PUT')
    req.flush(result1)
  });

  it('should return an error for updating a restaurant', () => {
    service.updateRestaurant(result1).subscribe(
      (resp) => fail('did not return an error'),
      (err) => {
        expect(err.status).toEqual(404)
        expect(err.error).toEqual('Test 404')
      })
    const req = httpTestControl.expectOne(`${baseUrl}/26`)
    req.flush("Test 404", {status: 404, statusText: 'Not Found'})
  });

  it('should delete a restaurant', () => {
    service.deleteRestaurant(26).subscribe((resp) => {})
    const req = httpTestControl.expectOne(`${baseUrl}/26`)
    expect(req.request.method).toEqual('DELETE')
    req.flush('')
  });

  it('should return en error deleting a restaurant', () => {
    service.deleteRestaurant(26).subscribe(
      (resp) => {},
      (error) => {
        expect(error.status).toEqual(404)
        expect(error.error).toEqual('Test 404')
      })
      const req = httpTestControl.expectOne(`${baseUrl}/26`)
    expect(req.request.method).toEqual('DELETE')
    req.flush('Test 404', {status: 404, statusText: 'Not Found'})
  })

});
