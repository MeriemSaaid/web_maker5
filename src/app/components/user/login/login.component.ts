import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service.client";
import { NgModule } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { User } from "src/app/models/user.model.client";
import { SharedService } from "src/app/services/shared.service.client";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private userservice: UserService,
    private router: Router,
    private sharedservice: SharedService
  ) {}
  error_flag = false;
  username = "";
  password = "";

  ngOnInit() {
    this.error_flag = false;
  }
  /*login() {
    this.userservice
      .findUserByCredentials(this.username, this.password)
      .subscribe(
        (user: User) => {
          if (!user) {
            this.error_flag = true;
          } else {
            this.error_flag = false;
            this.router.navigate(["/user/" + user._id]);
          }
        },
        (error: any) => {
          this.error_flag = true;
        }
      );
  }
*/
  login() {
    // calling client side userservice to send login information
    console.log("data", this.password);
    this.userservice.login(this.username, this.password).subscribe(
      (data: any) => {
        this.sharedservice.user = data;
        this.router.navigate(["/profile"]);
        //this.router.navigate(["/user/" + user._id]);
      },
      (error: any) => {
        this.error_flag = true;
      }
    );
  }
}
