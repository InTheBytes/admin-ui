import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type getFunction = (pageSize: number, page: number) => Observable<HttpResponse<any[]>>

@Injectable({
  providedIn: 'root'
})

export class PaginationService {

  constructor() { }

  totalPages: number
  currentPage: number
  pageSize: number
  serviceCall: getFunction

  initialize(serviceFunct: getFunction, pageSize: number): any[] {
    this.serviceCall = serviceFunct
    this.currentPage = 1
    this.pageSize = pageSize
    return this.getPage()
  }

  changePage(pagesTurned: number = 1): any[] {
    this.currentPage += pagesTurned
    return this.getPage()
  }

  getPage(): any[] {
    let result: any[]
    this.serviceCall(this.pageSize, this.currentPage).subscribe(
      (resp) => {
        this.currentPage = Number(resp.headers.get('page'))
        this.totalPages = Number(resp.headers.get('total-pages'))
        result = resp.body
        this.pageSize = result.length
      },
      (err) => {
        throw err
      }
    )
    return result
  }
}
