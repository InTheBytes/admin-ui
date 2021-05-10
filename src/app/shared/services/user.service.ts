import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = "http://localhost:8080/user"

  getUsers = async (pageSize: number, page: number): Promise<HttpResponse<User[]>> => {
    const params = `page-size=${pageSize}&page=${page}`
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(`${this.baseUrl}?${params}`, {observe: 'response'}).subscribe(
      (resp) => {
        resolve(resp)
      },
      (err) => {
        reject(err)
      }
    )})
  }

  getActiveUsers = async (pageSize: number, page: number): Promise<HttpResponse<User[]>> => {
    const params = `page-size=${pageSize}&page=${page}`
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(`${this.baseUrl}/active?${params}`, {observe: 'response'}).subscribe(
      (resp) => {
        resolve(resp)
      },
      (err) => {
        reject(err)
      }
    )})
  }

  getUser = async (id: number): Promise<HttpResponse<User>> => {
    return new Promise((resolve, reject) => {
      this.http.get<User>(`${this.baseUrl}/${id}`, {observe: 'response'}).subscribe(
        (resp) => {
          resolve(resp)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }

  updateUser = async (payload: User): Promise<HttpResponse<User>> => {
    return new Promise((resolve, reject) => {
      this.http.put<User>(`${this.baseUrl}/${payload.userId}`, payload, {observe: 'response'})
        .subscribe(
          (resp) => {
            resolve(resp)
          },
          (err) => {
            reject(err)
          }
        )
    })
  }

  deleteUser = async (id: number): Promise<HttpResponse<any>> => {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.baseUrl}/${id}`, {observe: 'response'}).subscribe(
        (resp) => {
          resolve(resp)
        },
        (err) => {
          reject(err)
        }
      )
    })
  } 
}
