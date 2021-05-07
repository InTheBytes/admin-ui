import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type getFunction = (pageSize: number, page: number, query?: string) => Promise<HttpResponse<any[]>>

@Injectable({
  providedIn: 'root'
})

export class PaginationService {

  constructor() { }

  totalPages: number
  currentPage: number
  pageSize: number
  serviceCall: Function

  initialize(getFunct: getFunction, pageSize: number): Promise<any[]> {
    this.serviceCall = getFunct
    this.currentPage = 1
    this.pageSize = pageSize
    return this.getPage()
  }

  search(value: string, params: string[]): Promise<any[]> {
    params.forEach((x) => {
      x += `=${value}`
    })
    return this.getPage(params.join("&"))
  }

  changePage(page: number): Promise<any[]> {
    this.currentPage = page
    return this.getPage()
  }

  getPage(query?: string): Promise<Object[]> {
    let result: Object[]
    return new Promise((resolve, reject) => {
      if (typeof query !== 'undefined') {
        this.serviceCall(this.pageSize, this.currentPage, query).then(
          (value) => {  
            this.currentPage = Number(value.headers.get('page'))
            this.totalPages = Number(value.headers.get('total-pages'))
            resolve(value.body)
          },
          (err) => {
            reject(err)
          }
        )
      } else {
        this.serviceCall(this.pageSize, this.currentPage).then(
          (value) => {  
            this.currentPage = Number(value.headers.get('page'))
            this.totalPages = Number(value.headers.get('total-pages'))
            resolve(value.body)
          },
          (err) => {
            reject(err)
          }
        )
      }
    })

    // POSSIBLE SEARCH IMPLEMENTATION (future)
    // if (typeof query !== 'undefined') {
    // }
  }
}
