import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Predicate } from '@angular/core';
import { Router } from '@angular/router';
import { convert, User, UserEntity } from '../model/user';
import { ApiService } from './backend-core/api.service';
import { BackendService } from './backend-core/backend.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BackendService<User> {

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router
  ) {
    super(api, router)
    this.base = 'user'
   }

  baseUrl = "http://localhost:8080/user"

  // filterGetUsers = (filterFunct: Predicate<User>): getFunction => {
  //   return (pageSize: number, page: number):Promise<HttpResponse<User[]>> => {
  //     return new Promise((resolve, reject) => {
  //       this.getUsers(pageSize, page).then(
  //         (resp) => {
  //           const filteredBody = resp.body.filter(filterFunct)
  //           const newResp = resp.clone({body: filteredBody})
  //           resolve(newResp)
  //         },
  //         (err) => {
  //           reject(err)
  //         }
  //       )
  //     })
  //   }
  // }

  getUser = this.getObject
  updateUser = this.updateObject
  deleteUser = this.deleteObject
  getAllUsers = this.getPage

  getUsersByActive = (active: boolean, page?: number, pageSize?: number) => {
    return this.getPage(page, pageSize, [{param: 'active', argument: true}])
  }

  getInactiveUsers = (page?: number, pageSize?: number) => {
    return this.getUsersByActive(false)
  }

  getActiveUsers = (page?: number, pageSize?: number) => {
    return this.getUsersByActive(true, page, pageSize)
  }


  
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
