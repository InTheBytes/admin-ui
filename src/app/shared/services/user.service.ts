import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Predicate } from '@angular/core';
import { convert, User, UserEntity } from '../model/user';
import { getFunction } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = "https://api.stacklunch.com/user"

  filterGetUsers = (filterFunct: Predicate<User>): getFunction => {
    return (pageSize: number, page: number):Promise<HttpResponse<User[]>> => {
      return new Promise((resolve, reject) => {
        this.getUsers(pageSize, page).then(
          (resp) => {
            const filteredBody = resp.body.filter(filterFunct)
            const newResp = resp.clone({body: filteredBody})
            resolve(newResp)
          },
          (err) => {
            reject(err)
          }
        )
      })
    }
  }

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

  getUser = async (id: string): Promise<HttpResponse<User>> => {
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

  deleteUser = async (id: string): Promise<HttpResponse<any>> => {
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

  loginUser(user: User){}
  registerUser = async (user: User): Promise<User> => {
    const headers = {'content-type': 'application/json'}
    const path = this.baseUrl + "/register"
    return new Promise((resolve, reject) => {
      this.http.post<User>(path, convert(user), {'headers':headers, 'responseType':'json'}).subscribe(
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
