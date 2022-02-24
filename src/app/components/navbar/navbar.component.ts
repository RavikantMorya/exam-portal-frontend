import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false; //track login of user
   user:any;//store user

  constructor(public login:LoginService) { 
  }

   public logout()
   {
     this.login.logout();
    //  this.isLoggedIn=false;
    //  this.user=null;
     window.location.reload();
   }
  ngOnInit(): void {
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    console.log(this.user);
    
    this.login.loginStatusSubject.subscribe(
      (data)=>{
        this.isLoggedIn=this.login.isLoggedIn();
        this.user=this.login.getUser();
      }
    );
   
  }

}
