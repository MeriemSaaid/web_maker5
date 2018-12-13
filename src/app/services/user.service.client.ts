import { del } from "selenium-webdriver/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Http, Response, RequestOptions } from "@angular/http";
import { map } from "rxjs/operators";
import { SharedService } from "./shared.service.client";
import { Router } from "@angular/router";
import { User } from "../models/user.model.client";

@Injectable()
export class UserService {
  constructor(
    private http: Http,
    private router: Router,
    private sharedservice: SharedService
  ) {}
  baseUrl = environment.baseUrl;
  options = new RequestOptions();

  //Function to create new user
  createUser(user: any) {
    const url = this.baseUrl + "/api/user";
    return this.http.post(url, user).pipe(
      map((res: Response) => {
        return res.json();
      })
    );
  }
  //Function to find user id
  findUserById(userId: string) {
    const url = this.baseUrl + "/api/user/" + userId;
    return this.http.get(url).pipe(
      map((res: Response) => {
        console.log(res);
        return res.json();
      })
    );
  }
  //Function to find user by username
  findUserByUsername(username: string) {
    //const url = this.baseUrl + "/api/user/username/" + username;
    const url = this.baseUrl + "/api/user?username=" + username;
    return this.http.get(url).pipe(
      map((res: Response) => {
        return res.json();
      })
    );
  }

  //Function to find user by username
  findUserByCredentials(username: string, password: string) {
    const url =
      this.baseUrl + "/api/user?username=" + username + "&password=" + password;
    return this.http.get(url).pipe(
      map((res: Response) => {
        return res.json();
      })
    );
  }
  //Function to update a user
  updateUser(user) {
    const url = this.baseUrl + "/api/user";
    return this.http.put(url, user).pipe(
      map((res: Response) => {
        return res.json();
      })
    );
  }
  //Function to delete a user
  deleteUser(userId) {}

  login(username: string, password: string) {
    this.options.withCredentials = true;

    const url = this.baseUrl + "/api/login";
    const user = {
      username: username,
      password: password
    };

    return this.http.post(url, user, this.options).pipe(
      map((res: Response) => {
        return res.json();
      })
    );
  }
  //
  loggedIn() {
    this.options.withCredentials = true;
    return this.http
      .post(this.baseUrl + "/api/loggedIn", "", this.options)
      .pipe(
        map((res: Response) => {
          const user = res.json();
          console.log(user);
          if (user !== 0) {
            this.sharedservice.user = user; // setting user so as to share with all components
            return true;
          } else {
            this.router.navigate(["/login"]);
            return false;
          }
        })
      );
  }
  //
  logout() {
    this.options.withCredentials = true;
    const url = this.baseUrl + "/api/logout";
    return this.http.post(url, "", this.options).pipe(
      map((res: Response) => {
        this.sharedservice.user = 0;
        return res;
      })
    );
  }
  register(user: User) {
    // this communication will be secured
    this.options.withCredentials = true;
    const url = this.baseUrl + "/api/register";
    return this.http.post(url, user, this.options).pipe(
      map((res: Response) => {
        return res.json();
      })
    );
  }
  adminLoggedIn() {
    this.options.withCredentials = true;
    return this.http
      .post(this.baseUrl + "/api/loggedIn", "", this.options)
      .pipe(
        map((res: Response) => {
          const user = res.json();
          if (user !== 0 && user.admin) {
            return true;
          } else {
            this.router.navigate(["/profile"]);
            return false;
          }
        })
      );
  }
}
