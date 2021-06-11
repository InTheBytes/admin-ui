import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../model/page';

export type getFunction = 
  (pageSize: number, page: number, query?: string) => 
  Promise<HttpResponse<any[]>> | Promise<Page<any>>

@Injectable({
  providedIn: 'root'
})

export class PaginationService {

  constructor() { }

  totalPages: number
  currentPage: number
  pageSize: number
  serviceCall: Function

  // Boolean for discrepencies in backend pagination
  // patchwork to be removed when all services migrate to new pagination
  newPageStyle: boolean

  initialize(getFunct: getFunction, pageSize: number, pageStyle?: boolean): Promise<any[]> {
    if (!(typeof pageStyle == 'undefined' || pageStyle == null))
      this.newPageStyle = pageStyle

    console.log('initialized pager')
    this.serviceCall = getFunct
    console.log(this.serviceCall)
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
    console.log('new style: ' + this.newPageStyle)
    if (this.newPageStyle) {
      return new Promise((resolve, reject) => {
        console.log('promise was called')
        this.serviceCall(this.currentPage, this.pageSize).then(
          (value) => {
            console.log("fetching page")
            this.currentPage = value.pageMetadata.number
            this.totalPages = value.pageMetadata.totalPages
            resolve(value.content)
          }, (err) => {
            console.log('error getting page')
            reject(err)
          }
        )
      })
    } else {
      return this.oldGetPage(query)
    }
  }

  oldGetPage(query?: string): Promise<Object[]> {
    console.log('made it to the old get page')
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
  }
}
