import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authen:AuthenticationService 
  ) { }
  
  username: any;
  password: any;

  ngOnInit() {
  }
  login(){
    this.authen.login(this.username,this.password);
  }

}
