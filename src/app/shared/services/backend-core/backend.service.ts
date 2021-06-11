import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '../../model/page';
import { ApiService } from './api.service';

@Injectable()
export abstract class BackendService<T> {
  base: string;

  constructor(private apiService: ApiService, private routerService: Router) {}

  resolver = (callback: (val: any) => void | any) => {
    return (x) => {callback(x.body)};
  };

  rejecter = (callback: (val: any) => void | any) => {
    return (x: any) => {
      if (x.status == 401) {
        this.redirect401ToLogin(x, callback);
      } else {
        callback(x);
      }
    };
  };

  redirect401ToLogin(error: HttpErrorResponse, errorHandler: Function) {
    if (error.status == 401) {
      this.routerService.navigate(['/login']);
    } else {
      errorHandler(error);
    }
  }

  checkOptionalParam(val: any): boolean {
    return !(typeof val == 'undefined' || val == null);
  }

  getPage(page?: number, pageSize?: number): Promise<Page<T>> {
    let params = '';
    params += this.checkOptionalParam(page) ? `?page=${page-1}` : '';
    params += this.checkOptionalParam(pageSize) ? `&page-size=${pageSize}` : '';

    return new Promise((resolve, reject) => {
      let adjustedPage: number
      this.apiService
        .get<Page<T>>(`${this.base}${params}`)
        .subscribe(
          (response) => {
            let page = response.body
            page.pageMetadata.number = response.body.pageMetadata.number + 1
            console.log(page)
            resolve(response.body)
          }, this.rejecter(reject));
    });
  }

  getObject(id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get<T>(`${this.base}/${id}`)
        .subscribe(this.resolver(resolve), this.rejecter(reject));
    });
  }

  updateObject(id: string, payload: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.apiService
        .put<T>(`${this.base}/${id}`, payload)
        .subscribe(this.resolver(resolve), this.rejecter(reject));
    });
  }

  createObject(payload: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.apiService
        .post<T>(this.base, payload)
        .subscribe(this.resolver(resolve), this.rejecter(reject));
    });
  }

  deleteObject(id: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.apiService.delete(`${this.base}/${id}`).subscribe((value) => {
        resolve(true);
      }, this.rejecter(reject));
    });
  }
}
