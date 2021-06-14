// import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { NgModule } from '@angular/core';
// import { TestBed } from '@angular/core/testing';
// import { FormBuilder } from '@angular/forms';
// import { Observable } from 'rxjs';

// import { PaginationService } from './pagination.service';

// describe('PaginationService', () => {
//   let service: PaginationService;


//   function testResponse(body: any[], page: number): Observable<HttpResponse<any[]>> {
//     return Observable.create(function (observer) {
//       observer.next(new HttpResponse({body: `${body}`, headers: makeHeader(page) }))
//       observer.complete()
//     })
//   }

//   function makeHeader(page: number): any {
//     return {headers: {'page': `${page}`, 'total-pages': '3'}}
//   }

//   function serviceCall(size: number, page: number) {
//     let body
//     if (page <= 0) {
//       throw new HttpErrorResponse({error: {status: 500}})
//     } else if (page == 1) {
//       body = [{name:'test01'}, {name:'test02'}]
//     } else if (page < 3) {
//       body = [{name:'test11'}, {name: 'test12'}]
//     } else {
//       body = [{name:'test11'}, {name: 'test12'}]
//     }
//     return testResponse(body, page)
//   }

//   function badCall(size: number, page: number) {
//     throw new HttpErrorResponse({error: {status: 404}})
//     return null;
//   }

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule
//       ],
//       providers: [
//         FormBuilder,
//         NgModule
//       ]
//     });
//     service = TestBed.inject(PaginationService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should intialize values and return page', () => {
//     const page = service.initialize(serviceCall, 2)
//     expect(service.currentPage).toEqual(1)
//     expect(service.serviceCall).toEqual(serviceCall)
//     expect(service.pageSize).toEqual(2)
//   })

//   it('should throw error from service', () => {
//     expect(service.initialize(badCall, 2)).toThrow({error:{status:404}})
//   })

//   it('should get the current page', () => {
//     service.serviceCall = serviceCall
//     service.currentPage = 1
//     service.pageSize = 2
//     const page = service.getPage()
//     expect(service.totalPages).toEqual(2)
//     expect(page).toContain({name:'test01'})
//     expect(page).toContain({name:'test02'})
//   })

//   it('should throw an error getting page', () => {
//     service.serviceCall = badCall
//     service.currentPage = 1
//     service.pageSize = 2
//     expect(service.getPage()).toThrow({error:{status:404}})
//   })

//   // it('should increment the page', () => {
//   //   service.initialize(serviceCall, 2)
//   //   // let nextPage = service.changePage()
//   //   expect(nextPage).toContain({name:'test11'})
//   //   expect(nextPage).toContain({name:'test12'})
//   //   expect(service.currentPage).toEqual(2)
//   //   expect(service.totalPages).toEqual(3)
//   // })

//   it('should skip a page', () => {
//     service.initialize(serviceCall, 2)
//     let nextPage = service.changePage(2)
//     expect(nextPage).toContain({name:'test21'})
//     expect(nextPage).toContain({name:'test22'})
//     expect(service.currentPage).toEqual(3)
//     expect(service.totalPages).toEqual(3)
//   })

//   // it('should go back a page', () => {
//   //   service.initialize(serviceCall, 2)
//   //   // service.changePage()
//   //   expect(service.currentPage).toEqual(2)
//   //   let lastPage = service.changePage(-1)
//   //   expect(service.currentPage).toEqual(1)
//   //   expect(lastPage).toContain({name:'test01'})
//   // })

//   it('should throw error for page 0', () => {
//     service.initialize(serviceCall, 2)
//     expect(service.changePage(-1)).toThrow({error:{status:404}})
//   })

// });
