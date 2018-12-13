import { Component, OnInit } from "@angular/core";
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { UserService } from "src/app/services/user.service.client";
import { Router } from "@angular/router";
import { NgModule } from "@angular/core";
import { concat } from "rxjs";
import { User } from "src/app/models/user.model.client";
import { SharedService } from "src/app/services/shared.service.client";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  user_error: boolean;
  pwd_error: boolean;
  register_Form: FormGroup;
  submitted = false;

  constructor(
    private userservice: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sharedservice: SharedService
  ) {}

  ngOnInit() {
    this.register_Form = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      verifPassword: ["", Validators.required]
    });
  }
  get f() {
    return this.register_Form.controls;
  }
  register() {
    console.log("ddddd0");
    this.submitted = true;
    //console.log(this.register_Form.value);
    if (this.register_Form.invalid) {
      return;
    }
    const username = this.register_Form.value["username"];
    const password = this.register_Form.value["password"];
    const verifPassword = this.register_Form.value["verifPassword"];
    console.log("111");
    if (password === verifPassword) {
      //const user: User = this.userservice.findUserByUsername(username);
      this.userservice.findUserByUsername(username).subscribe((user: User) => {
        if (!user) {
          /*let newUser = {
            username: username,
            password: password,
            verifPassword: verifPassword
          };*/
          this.user_error = false;
          const newUser: User = {
            username: username,
            password: password,
            firstName: "",
            lastName: "",
            email: ""
          };

          this.userservice.register(newUser).subscribe((user: User) => {
            this.sharedservice.user = user;
            //this.router.navigate(["user", user._id]);
            this.router.navigate(["profile"]);
          });
        } else {
          this.user_error = true;
          this.pwd_error = false;
        }
      });
    } else {
      this.pwd_error = true;
      this.user_error = false;
    }
  }
}
