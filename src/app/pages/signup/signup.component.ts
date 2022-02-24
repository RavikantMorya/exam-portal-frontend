import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
//import { MustMatch } from '../sign/_helper/must-match.validator';
import { MustMatch } from './_helper/must-match.validator';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

  //this control our form
  form: FormGroup = new FormGroup({}); 
  //tell the status of form submission
  submitted = false; 
  constructor(private userService:UserService,private _snackBar: MatSnackBar,private fb: FormBuilder) {
    this.form = fb.group({  
      //validating each field as per requirement
      mobileNumber: ['', [Validators.required , Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] ,
      username:['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      fname:['',Validators.required],
      lname:['',Validators.required],
      email:['',[Validators.required, Validators.email]],

    },{
      //this is the MustMatch method imported from helper which match password and confrimpassword field
      validator: MustMatch('password', 'confirmPassword')
  })  
   }
 
  ngOnInit(): void {
  }
  public user=
  {
    username:'',
    password:'',
    fname:'',
    lname:'',
    email:'',
    phone:'',

  }

  get f(){  
    return this.form.controls;  
  }  

  onReset() {
    this.submitted = false;
    this.form.reset();
}
  onSubmit()
  {
    this.submitted=true;
    if (this.form.invalid) {
      return;
  }
    console.log(this.user);
    console.log(this.form.value);  
      if(this.user.username=='' || this.user.username==null)
      {

        this._snackBar.open("Username is required",'ok',{
          duration:3000
        });
        return;
      }


      // add the user
      //if any error or data is generated during calling the api from angular this can be monitored by observable
      //we need to subscribe it for using 
      this.userService.addUser(this.user).subscribe(
        (data:any)=>{
          console.log(data);
          Swal.fire(
            'Registration Successful!!!',
            'username is '+data.username,
            'success'
          )
          this.form.reset();
                },
        (error)=>{
          console.log("error");
          this._snackBar.open("Something went wrong",'ok');
          
        }
        
      )
  }
}
