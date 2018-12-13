import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "./user.service.client";

@Injectable()
export class AuthGuardSevice implements CanActivate {
  constructor(private userservice: UserService) {}

  canActivate() {
    return this.userservice.loggedIn();
  }
}
