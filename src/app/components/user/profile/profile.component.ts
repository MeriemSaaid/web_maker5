import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service.client";
import { FormsModule } from "@angular/forms";
import { Http, Response } from "@angular/http";
import { map } from "rxjs/operators";
import { User } from "src/app/models/user.model.client";
import { SharedService } from "src/app/services/shared.service.client";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  uid: string;
  oldUsername: string;
  user: User = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    admin: false
  };
  userError: boolean;
  successFlag: boolean;
  constructor(
    private router: Router,
    private userservice: UserService,
    private activerouter: ActivatedRoute,
    private sharedservice: SharedService
  ) {}
  //Initilize the form
  ngOnInit() {
    this.user = this.sharedservice.user;
    this.oldUsername = this.user._id;
    this.uid = this.user._id;
    /*this.activerouter.params.subscribe(params => {
      (this.uid = params["uid"]), console.log(this.uid);
      this.userservice.findUserById(this.uid).subscribe((user: User) => {
        (this.user = user), (this.oldUsername = this.user._id);
      });
    });*/

    //this.userservice.findUserById()
  }
  //Update the user
  update() {
    if (this.user._id == this.oldUsername) {
      this.userservice.updateUser(this.user).subscribe((user: User) => {
        this.userError = false;
        this.successFlag = true;
      });
    } else {
      this.userservice.findUserById(this.user._id).subscribe(
        (user: User) => {
          this.userError = true;
          this.successFlag = false;
        },
        (error: any) => {
          this.userservice.updateUser(this.user).subscribe((user: User) => {
            this.userError = false;
            this.successFlag = true;
          });
        }
      );
    }
  }

  logout() {
    this.userservice.logout().subscribe((data: any) => {
      this.router.navigate(["login"]);
    });
  }
}
