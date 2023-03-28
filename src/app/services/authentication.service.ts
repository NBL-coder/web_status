import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { OnpageserviceService } from './onpageservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router:Router
  ) {
    this.loadstate();
  }
  loadstate(){
    if (this.islogin()){
      OnpageserviceService.isAuthenticated.next("1");
    }
    else{
      OnpageserviceService.isAuthenticated.next("-1");
    }
  }
  islogin(){
    var il = localStorage.getItem("access_token");
    return il && il != "" ? true:false;
  }
  login(username:any, password:any) {
    //placeholder for login APIm simple if check for admin account
    if (username == "admin" && password == "123"){
      
      localStorage.setItem("access_token","placeholder_token");
      localStorage.setItem("UserName",username);
      localStorage.setItem("Role","Admin");

      OnpageserviceService.isAuthenticated.next("1");
      this.router.navigateByUrl("/", { replaceUrl : true });
    }
  }
  logout() {
    this.router.navigateByUrl("/", { replaceUrl : true });
    localStorage.removeItem("UserName");
    localStorage.removeItem("access_token");
    localStorage.removeItem("Role");

    OnpageserviceService.isAuthenticated.next("-1");
    this.router.navigateByUrl("login", { replaceUrl : true });
  }
}
