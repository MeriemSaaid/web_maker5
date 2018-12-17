import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service.client";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  private user;
  constructor(
    private activerouter: ActivatedRoute,
    private userservice: UserService
  ) {}

  ngOnInit() {}

  createUser() {
    this.userservice.createUser(this.user).subscribe((creates: any) => {});
  }
}
