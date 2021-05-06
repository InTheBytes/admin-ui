import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    if (typeof query !== 'undefined') {
      
    //   try {
    //     result = this.readPage(this.serviceCall(this.pageSize, this.currentPage, query))
    //     console.log("Total Pages: "+this.totalPages)
    //     return result
    //   } catch {
    //     console.log("Something went wrong")
    //   }
    // } else {
    //   let result = this.readPage(this.serviceCall(this.pageSize, this.currentPage))
    //   return this.readPage(this.serviceCall(this.pageSize, this.currentPage))
    // }
  }

  // readPage(response: Promise<HttpResponse<Object[]>>): any {
  //   let result: HttpResponse<Object[]>
  //   response.then(
  //     (resp) => {
  //       result = resp
  //     }, 
  //     (err) => {
  //       throw err
  //   })
  //   return result

    // response.subscribe(
    //   (resp) => {
    //     console.log(resp)
    //     this.currentPage = Number(resp.headers.get('page'))
    //     this.totalPages = Number(resp.headers.get('total-pages'))
    //     console.log("Resp Page "+resp.headers.get("page"))
    //     console.log("Resp Total "+resp.headers.get("total-pages"))
    //     result = resp.body
    //     console.log(result)
    //     console.log(this.totalPages)
    //     return result
    //   },
    //   (err) => {
    //     throw err
    //   }
    // )
    // console.log(result)
    // return result
  }
}
