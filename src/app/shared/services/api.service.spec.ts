import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpTestingController

  let endpoint: string = "test"
  let path: string
  let object: Object = {hello: "Test"}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    http = TestBed.inject(HttpTestingController)
    service = TestBed.inject(ApiService);
    path = `${service.url}/${endpoint}`
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform a GET call', () => {
    service.get<Object>(endpoint).subscribe(
      (resp) => { expect(resp.body).toEqual(object) },
      (err) => { fail("Http Client threw an error") }
    )
    const req = http.expectOne(path)
    expect(req.request.method).toEqual('GET')
    req.flush(object)
  })

  it('should perform a DELETE call', () => {
    service.delete(endpoint).subscribe(
      (resp) => { expect(resp.body).toEqual(object) },
      (err) => { fail("Http Client threw an error") }
    )
    const req = http.expectOne(path)
    expect(req.request.method).toEqual('DELETE')
    req.flush(object)
  })

  it('should perform a PUT call', () => {
    service.put<Object>(endpoint, object).subscribe(
      (resp) => { expect(resp.body).toEqual(object) },
      (err) => { fail("Http Client threw an error") }
    )
    const req = http.expectOne(path)
    expect(req.request.method).toEqual('PUT')
    req.flush(object)
  })

  it('should perform a POST call', () => {
    service.post<Object>(endpoint, object).subscribe(
      (resp) => { expect(resp.body).toEqual(object) },
      (err) => { fail("Http Client threw an error") }
    )
    const req = http.expectOne(path)
    expect(req.request.method).toEqual('POST')
    req.flush(object)
  })

  it('should respond to error from Http call', () => {
    service.get<Object>(endpoint).subscribe(
      (resp) => { fail("Error was treated as a success") },
      (err) => { expect(err.status).toEqual(404) }
    )
    const req = http.expectOne(path)
    req.flush("Error", {status: 404, statusText: 'Error'})
  })

  it('should include auth if present', () => {
    service.auth = "Bearer token"
    service.get<Object>(endpoint).subscribe(
      (resp) => { },
      (err) => { }
    )
    const req = http.expectOne(path)
    expect(req.request.headers.has(service.authLabel)).toBeTrue()
    expect(req.request.headers.get(service.authLabel)).toEqual("Bearer token")
    req.flush(object)
  })
});
