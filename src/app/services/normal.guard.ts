import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
//Suppose a user is loggedIn as admin user after that he hit /normal url by browser then he will access normal page
//to protect this we use a guard
export class NormalGuard implements CanActivate {
  constructor(private login:LoginService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.login.isLoggedIn()  &&  this.login.getUserRole()=='NORMAL')
     {
        return true;
     }
    this.router.navigate(['login']);
      return false;
 }
  
}
