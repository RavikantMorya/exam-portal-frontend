import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //with the help of subject we can send data anywhere. this subject will help to get status of loggedin
  //use in login.ts and navbar.ts
  //whoever subsribe this subject will get notified
  public loginStatusSubject = new Subject<boolean>();
 
  constructor(private http:HttpClient) { }

  public generateToken(loginData:any)
  {
    return this.http.post(`${baseUrl}/generated-token`,loginData);
  }

  //setToken in localstorage
  public loginUser(token:any)
  {
    localStorage.setItem("token",token);
    return true;
  }
  //check user is logged in or not
  public isLoggedIn()
  {
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null)
    {
      return false;
    }else{
      return true;
    }
  }
  //remove token from local storage
  public logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //get token from localstoarge
  public getToken()
  {
    return localStorage.getItem("token");
  }
  //set userdetails in localstorage
  public setUser(user:any)
  {
      localStorage.setItem("user",JSON.stringify(user));
  }

  //get userdetails from localstorage-
  public getUser()
  {
   let userStr=localStorage.getItem("user");
   if(userStr!=null)
   {
     return JSON.parse(userStr) ;
   }else
   {
     this.logout();
     return null;
   }
  }
  //get user role from localstorage
  public getUserRole()
  {
    let user=this.getUser();
    return user.authorities[0].authority;
  }
//get current loggedin user
public getCurrentUser()
{
  return this.http.get(`${baseUrl}/current-user`);  
}

}
