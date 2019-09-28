import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { PasswordValidation } from '../password-validation';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  status: string='login';
  loginForm: FormGroup;
  registerForm: FormGroup;



  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initFormLogin();
    this.initFormRegistr();
  }
  private initFormLogin() {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required],
      remember: ['']
    });
  }
  private initFormRegistr(){
    this.registerForm = this.fb.group({
       nick:['', [Validators.required, Validators.pattern( /[a-z].{3,10}/)]],
       name:['', [Validators.required, Validators.pattern( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
       password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/)]],
       confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/)]],

    },{
         validator: PasswordValidation.MatchPassword // your validation method*/
      }

    );
  }

  onRegistr(){
    this.status='register';
  }
  OnLogin(){
    this.status='login';
  }
  OnForgot(){
    this.status='forgot';
  }
  onSubmitLogin(){
    this.loginForm.getRawValue();
    console.log("this.loginForm.getRawValue()",this.loginForm.getRawValue());
    console.log("name",this.loginForm.value.name);
    console.log("password",this.loginForm.value.password);
    if(this.loginForm.value.remember==true){
      console.log("need to save");
    }else{
      console.log("don't need to save");
    }
  }
  OnSubmitRegister(){
    this.registerForm.getRawValue();
    console.log("this.loginForm.getRawValue()",this.registerForm.getRawValue());

    if(this.registerForm.value.password==this.registerForm.value.confirmPassword){
      console.log("complite");
    }else{
      console.log("not complite");
    }
  }
}
