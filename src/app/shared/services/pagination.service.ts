import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../model/page';
import { Query } from './backend-core/backend.service';

export type getFunction = 
  (page?: number, pageSize?: number, query?: Query[]) => Promise<Object> | Promise<Page<Object>>

@Injectable()
export class PaginationService {

  constructor() { }

  totalPages: number
  currentPage: number
  pageSize: number
  serviceCall: Function

  initialize(getFunct: getFunction, pageSize: number, pageStyle?: boolean): Promise<any[]> | Promise<Page<any>> {
    this.serviceCall = getFunct
    this.currentPage = 1
    this.pageSize = pageSize
    return this.getPage()
  }

  search(value: string, params: string[]): Promise<any[]> | Promise<Page<any>> {
    params.forEach((x) => {
      x += `=${value}`
    })
    return this.getPage(params.join("&"))
  }

  changePage(page: number): Promise<any[]> | Promise<Page<any>>{
    this.currentPage = page
    return this.getPage()
  }

  getPage(query?: string): Promise<Object[]> {
      return new Promise((resolve, reject) => {
        this.serviceCall(this.currentPage - 1, this.pageSize).then(
          (value) => {
            this.currentPage = value.number
            this.totalPages = value.totalPages
            resolve(value.content)
          }, (err) => {
            reject(err)
          }
        )
      })
  }
}
