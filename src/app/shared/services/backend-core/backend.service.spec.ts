import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { Page } from '../../model/page';
import { ApiService } from './api.service';

import { BackendService } from './backend.service';

describe('BackendService', () => {
  let service: BackendService<any>;
  let base = 'test';
  let path = `${base}/id`;

  let apiMock = jasmine.createSpyObj('ApiService', [
    'get',
    'put',
    'post',
    'delete',
  ]);
  let routerMock = jasmine.createSpyObj('Router', ['navigate']);

  const result = { hello: 'test' };

  let resultPage: Page<any>;
  let cleanCopyPage: Page<any> = {
    content: [result],

    size: 1,
    totalElements: 1,
    totalPages: 1,
    number: 0,
  };

  function setResultPage() {
    resultPage = cleanCopyPage;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiMock },
        { provide: Router, useValue: routerMock },
        BackendService,
      ],
    });
    apiMock = TestBed.inject(ApiService);
    routerMock = TestBed.inject(Router);
    service = TestBed.inject(BackendService);
    service.base = base;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform get for a page of objects', () => {
    setResultPage();
    let response: HttpResponse<Page<any>> = new HttpResponse({
      body: resultPage,
    });
    apiMock.get.and.returnValue(of(response));

    service.getPage(1, 5).then(
      (value) => {
        expect(value).toEqual(resultPage);
        expect(value.number).toEqual(0);
      },
      (error) => {
        fail('An error was returned');
      }
    );
    expect(apiMock.get).toHaveBeenCalledWith(`${base}?page=1&page-size=5`);
  });

  it('should return customized page of objects', () => {
    setResultPage();
    let response: HttpResponse<Page<any>> = new HttpResponse({
      body: resultPage,
    });
    apiMock.get.and.returnValue(of(response));

    service.getPage(1, 5).then(
      (value) => {},
      (error) => {
        fail('returned an error with page params');
      }
    );
    expect(apiMock.get).toHaveBeenCalledWith(`${base}?page=1&page-size=5`);
  });

  it('should perform get for an object', () => {
    let response: HttpResponse<any> = new HttpResponse({ body: result });
    apiMock.get.and.returnValue(of(response));

    service.getObject('id').then(
      (value) => {
        expect(value).toEqual(result);
      },
      (error) => {
        expect(false).toBeTrue();
        fail('An error was returned');
      }
    );
    expect(apiMock.get).toHaveBeenCalledWith(path);
  });

  it('should perform put and recieve an object', () => {
    let response: HttpResponse<any> = new HttpResponse({ body: result });
    apiMock.put.and.returnValue(of(response));

    service.updateObject('id', result).then(
      (value) => {
        expect(value).toEqual(result);
      },
      (error) => {
        expect(false).toBeTrue();
        fail('An error was returned');
      }
    );
    expect(apiMock.put).toHaveBeenCalledWith(path, result);
  });

  it('should perform post with an object', () => {
    let response: HttpResponse<any> = new HttpResponse({ body: result });
    apiMock.post.and.returnValue(of(response));

    service.createObject(result).then(
      (value) => {
        expect(value).toEqual(result);
      },
      (error) => {
        fail('An error was returned');
      }
    );
    expect(apiMock.post).toHaveBeenCalledWith(base, result);
  });

  it('should perform delete on an object', () => {
    let response: HttpResponse<any> = new HttpResponse({
      status: 200,
      statusText: 'good',
    });
    apiMock.delete.and.returnValue(of(response));

    service.deleteObject('id').then(
      (value) => {
        expect(value).toBeTrue();
      },
      (error) => {
        fail('An error was returned');
      }
    );
    expect(apiMock.delete).toHaveBeenCalledWith(path);
  });

  it('should return error other than 401', () => {
    let response = { status: 401 };
    apiMock.get.and.returnValue(throwError(response));

    service.getObject('id').then(
      (value) => {
        fail('An error went the resolver');
      },
      (error) => {
        expect(error).toEqual(response);
      }
    );
    expect(apiMock.get).toHaveBeenCalledWith(path);
  });

  it('should redirect to login for 401', () => {
    let response = { status: 401 };
    apiMock.get.and.returnValue(throwError(response));

    service.getObject('id').then(
      (value) => {
        fail('An error went the resolver');
      },
      (error) => {
        fail('error handler was not overriden by redirect');
      }
    );
    expect(apiMock.get).toHaveBeenCalledWith(path);
    expect(routerMock.navigate).toHaveBeenCalled();
  });
});
