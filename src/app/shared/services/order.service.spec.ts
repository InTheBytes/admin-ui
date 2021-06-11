import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Order } from '../model/order';
import { Page } from '../model/page';
import { ApiService } from './backend-core/api.service';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let endpoint = 'id'
  let path: string

  let apiMock = jasmine.createSpyObj('ApiService', [
    'get',
    'put',
    'post',
    'delete',
  ]);
  let routerMock = jasmine.createSpyObj('Router', ['navigate']);

  let result: Order = {
    items: [
      {food: 'food', quantity: 1}
    ]
  };

  let resultPage: Page<Order> = {
    content: [result],
    pageMetadata: {
      size: 1,
      totalElements: 1,
      totalPages: 1,
      number: 0,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiMock },
        { provide: Router, useValue: routerMock },
        OrderService,
      ],});
      apiMock = TestBed.inject(ApiService);
      routerMock = TestBed.inject(Router);
    service = TestBed.inject(OrderService);
    path = `${service.base}/${endpoint}`
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform get for a page of Orders', () => {
    let response: HttpResponse<Page<any>> = new HttpResponse({
      body: resultPage,
    });
    apiMock.get.and.returnValue(of(response));

    service.getPage().then(
      (value) => {
        expect(value).toEqual(resultPage);
      },
      (error) => {
        fail('An error was returned');
      }
    );
    expect(apiMock.get).toHaveBeenCalled();
  });

  it('should perform get for an Order', () => {
    let response: HttpResponse<any> = new HttpResponse({ body: result });
    apiMock.get.and.returnValue(of(response));

    service.getOrder('id').then(
      (value) => {
        expect(value).toEqual(result);
      },
      (error) => {
        expect(false).toBeTrue()
        fail('An error was returned');
      }
    );
    expect(apiMock.get).toHaveBeenCalledWith(path);
  });

  it('should perform put and recieve an Order', () => {
    let response: HttpResponse<any> = new HttpResponse({ body: result });
    apiMock.put.and.returnValue(of(response));

    service.updateOrder('id', result).then(
      (value) => {
        expect(value).toEqual(result);
      },
      (error) => {
        expect(false).toBeTrue()
        fail('An error was returned');
      }
    );
    expect(apiMock.put).toHaveBeenCalledWith(path, result);
  });

  it('should perform post with an Order', () => {
    let response: HttpResponse<any> = new HttpResponse({ body: result });
    apiMock.post.and.returnValue(of(response));

    service.createOrder(result).then(
      (value) => {
        expect(value).toEqual(result);
      },
      (error) => {
        fail('An error was returned');
      }
    );
    expect(apiMock.post).toHaveBeenCalledWith(service.base, result);
  });

  it('should return error other than 401', () => {
    let response = {status: 401}
    apiMock.get.and.returnValue(throwError(response));

    service.getOrder('id').then(
      (value) => {
        fail('An error went the resolver')
      },
      (error) => {
        expect(error).toEqual(response)
      }
    )
    expect(apiMock.get).toHaveBeenCalledWith(path);
  })

  it('should redirect to login for 401', () => {
    let response = {status: 401}
    apiMock.get.and.returnValue(throwError(response))

    service.getOrder('id').then(
      (value) => {
        fail('An error went the resolver')
      },
      (error) => {
        fail('error handler was not overriden by redirect')
      }
    )
    expect(apiMock.get).toHaveBeenCalledWith(path);
    expect(routerMock.navigate).toHaveBeenCalled()
  })
});
