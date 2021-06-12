import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '../../model/page';
import { ApiService } from './api.service';

export class Query {
  param: string;
  argument: string | number | boolean;
}

@Injectable()
export abstract class BackendService<T> {
  base: string;

  constructor(
    private apiService: ApiService, 
    private routerService: Router
    ) {}

  resolver = (callback: (val: any) => void | any) => {
    return (x) => {
      callback(x.body);
    };
  };

  rejecter = (callback: (val: any) => void | any) => {
    return (x: any) => {
      if (x.status == 401) {
        console.log('made it to redirect')
        this.redirect401ToLogin(x, callback);
      } else {
        console.log('did not redirect, button error happened')
        callback(x);
      }
    };
  };

  redirect401ToLogin = (error: HttpErrorResponse, errorHandler: Function) => {
    if (error.status == 401) {
      console.log('error was 404')
      this.routerService.navigate(['/login']);
    } else {
      console.log('not read as 404')
      errorHandler(error);
    }
  }

  checkIfValueExists = (val: any): boolean => {
    return !(typeof val == 'undefined' || val == null);
  }

  craftQuery = (queries: Query[]): string => {
    let query = '';
    queries.forEach((q) => {
      query += query.length == 0 ? '?' : '&';
      query += `${q.param}=${q.argument}`;
    });
    return query;
  }

  getPage = (
    page?: number,
    pageSize?: number,
    queries?: Query[]
  ): Promise<Page<T>> => {
    let query: Query[] = [];
    if (this.checkIfValueExists(page)) {
      query.push({ param: 'page', argument: page });
    }
    if (this.checkIfValueExists(pageSize)) {
      query.push({ param: 'page-size', argument: pageSize });
    }
    if (this.checkIfValueExists(queries)) {
      query = query.concat(queries);
    }

    let params = query.length > 0 ? this.craftQuery(query) : '';
    return new Promise((resolve, reject) => {
      this.apiService
        .get<Page<T>>(`${this.base}${params}`)
        .subscribe((response) => {
          resolve(response.body);
        }, this.rejecter(reject));
    });
  }

  getObject = (id: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      this.apiService
        .get<T>(`${this.base}/${id}`)
        .subscribe(this.resolver(resolve), this.rejecter(reject));
    });
  }

  deleteObject = (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.apiService.delete<T>(`${this.base}/${id}`).subscribe((value) => {
        this.checkIfValueExists(value.body)
          ? resolve(value.body)
          : resolve(true);
      }, this.rejecter(reject));
    });
  }

  updateObject = (id: string, payload: any): Promise<T> => {
    return new Promise((resolve, reject) => {
      this.apiService
        .put<T>(`${this.base}/${id}`, payload)
        .subscribe(this.resolver(resolve), this.rejecter(reject));
    });
  }

  createObject = (payload: T): Promise<T> => {
    return new Promise((resolve, reject) => {
      this.apiService
        .post<T>(this.base, payload)
        .subscribe(this.resolver(resolve), this.rejecter(reject));
    });
  }

  createWithEndpoint = (endpoint: string, payload: T) => {
    return this.addEnpoint(endpoint, this.createObject, payload);
  }

  getPageAtEndpoint = (
    endpoint: string,
    page?: number,
    pageSize?: number,
    queries?: Query[]
  ) => {
    this.addEnpoint(endpoint, this.getPage, page, pageSize, queries);
  }

  addEnpoint = (
    endpoint: string,
    funct: (...args: any | any[]) => Promise<any>,
    ...args: any | any[]
  ): Promise<any> => {
    let url = this.base;
    this.base += `/${endpoint}`;
    let promise: Promise<any> = funct(args);
    this.base = url;
    return promise;
  }
}
