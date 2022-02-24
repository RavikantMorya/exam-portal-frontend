import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData = {
    username:"",
    password:"",
  }
  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit(){
  
    if(this.loginData.username.trim()=='' || this.loginData.username==null) //check for spaces and null value of user
    {
        this.snack.open("Username is required","ok",
        {
          duration:3000
        });
        return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
        this.snack.open("Password is required","ok",
        {
          duration:3000
        });
        return;
    }

    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data);
        this.login.loginUser(data.token);      
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
              this.login.setUser(user);
              console.log(user);
              //user is logged in redirect according to the role
              if(this.login.getUserRole()=="ADMIN"){
  //              window.location.href='/admin'
                this.router.navigate(['admin'])
                this.login.loginStatusSubject.next(true); //set subject status true as user is logged in
              }
              else if(this.login.getUserRole()=="NORMAL")
              {
//                window.location.href='/user-dashboard'
                this.router.navigate(['user-dashboard/0'])
                this.login.loginStatusSubject.next(true); //set subject status true as user is logged in
              }
              else{
                this.login.logout();
              }
             
             
            },
          (error:any)=>{

          }
        );
      
       },
      (error:any) => {
        this.snack.open("Invalid Credentials","ok",
        {
          duration:3000
        });
        console.log(error);
      }
    );
  }
}
