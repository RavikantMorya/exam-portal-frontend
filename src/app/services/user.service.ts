import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})

/* 
we create servie (ng g s service_name)to hit the http request. we create a helper.ts file which contains baseUrl of backend server and 
other things. 
Import HttpModuleClient in app.module.ts and add   HttpModuleClient in import arrays
created a http varible in constructor and a method addUser to add the user.
we hit http post request by the post method using object of HttpClient 
it takes url of the rest api and data if required
Now we can use addUser method in sigup component
*/

export class UserService {

  constructor(private http:HttpClient) { }

  //add user
  //any type means the user can be of any types
  public addUser(user:any)
  {
    console.log();
   return this.http.post(`${baseUrl}/user/`,user);
  }
}
