import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
//Suppose a user is loggedIn as normal user after that he hit /admin url by browser then he will access admin page
//to protect this we use a guard
export class AdminGuard implements CanActivate {
  constructor(private login:LoginService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //it will return true only if user is loggedin and he is a admin 
      if(this.login.isLoggedIn()  &&  this.login.getUserRole()=='ADMIN')
    {
      return true;
    }
    this.router.navigate(['login']);
      return false;
  }
  
}
