import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type getFunction = (pageSize: number, page: number, query?: string) => Observable<HttpResponse<any[]>>

@Injectable({
  providedIn: 'root'
})

export class PaginationService {

  constructor() { }

  totalPages: number
  currentPage: number
  pageSize: number
  serviceCall: Function

  initialize(getFunct: getFunction, pageSize: number): Object[] {
    this.serviceCall = getFunct
    this.currentPage = 1
    this.pageSize = pageSize
    return this.getPage()
  }

  search(value: string, params: string[]): Object[] {
    params.forEach((x) => {
      x += `=${value}`
    })
    return this.getPage(params.join("&"))
  }

  changePage(page: number): any[] {
    this.currentPage = page
    return this.getPage()
  }

  getPage(query?: string): Object[] {
    let result: Object[]
    if (typeof query !== 'undefined') {
      return this.readPage(this.serviceCall(this.pageSize, this.currentPage, query))
    } else {
      return this.readPage(this.serviceCall(this.pageSize, this.currentPage))
    }
  }

  readPage(response: Observable<HttpResponse<Object[]>>): Object[] {
    let result: Object[]
    response.subscribe(
      (resp) => {
        this.currentPage = Number(resp.headers.get('page'))
        this.totalPages = Number(resp.headers.get('total-pages'))
        result = resp.body
      },
      (err) => {
        throw err
      }
    )
    return result
  }
}
