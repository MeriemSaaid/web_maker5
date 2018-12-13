import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "./user.service.client";

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private userservice: UserService) {}

  canActivate() {
    return this.userservice.adminLoggedIn();
  }
}
