import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service.client";
import { SharedService } from "src/app/services/shared.service.client";
import { User } from "src/app/models/user.model.client";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  user: User = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    admin: false
  };
  private users;
  constructor(
    private userservice: UserService,
    private sharedservice: SharedService
  ) {}

  ngOnInit() {
    this.user = this.sharedservice.user;
    //console.log(this.user);
    this.userservice.findAllusers().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }
}
