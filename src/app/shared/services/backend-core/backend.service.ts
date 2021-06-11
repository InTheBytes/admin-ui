import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { Page } from '../../model/page';
import { ApiService } from './api.service';

@Injectable()
export abstract class BackendService<T> {
  base: string;

  constructor(private apiService: ApiService, private routerService: Router) {}

  resolver = (callback: (val: any) => void | any) => {
    return (x) => {console.log('in resolver'+x); callback(x.body)};
  };

  rejecter = (callback: (val: any) => void | any) => {
    return (x: any) => {
      console.log('in rejectpr ' + x)
      if (x.status == 401) {
        this.redirect401ToLogin(x, callback);
      } else {
        callback(x);
      }
    };
  };

  redirect401ToLogin(error: HttpErrorResponse, errorHandler: Function) {
    if (error.status == 401) {
      console.log("made it to redirect with 401")
      this.routerService.navigate(['/login']);
    } else {
      console.log("Not 401 - " + error)
      errorHandler(error);
    }
  }

  checkOptionalParam(val: any): boolean {
    return !(typeof val == 'undefined' || val == null);
  }

  getPage(page?: number, pageSize?: number): Promise<Page<T>> {
    let params = '';
    params += this.checkOptionalParam(page) ? `?page=${page}` : '';
    params += this.checkOptionalParam(pageSize) ? `&page-size=${pageSize}` : '';

    return new Promise((resolve, reject) => {
      this.apiService
        .get<Page<T>>(`${this.base}${params}`)
        .subscribe(this.resolver(resolve), this.rejecter(reject));
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
