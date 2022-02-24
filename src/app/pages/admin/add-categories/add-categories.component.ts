import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category={
    'title':'',
    'description':''
  }
  constructor(private cat:CategoryService,private snack:MatSnackBar) { }
  ngOnInit(): void {
  }

public formSubmit(){
  if(this.category.title.trim()=='' || this.category.title==null)
  {
    this.snack.open("title is required","ok",{
      duration:3000
    })
    return;
  }


  if(this.category.description.trim()=='' || this.category.description==null)
  {
    this.snack.open("description is required","ok",{
      duration:3000
    })
    return;
  }

  this.cat.addCategory(this.category).subscribe(
    (data:any)=>{
      this.category.title='';
      this.category.description='';
        Swal.fire("Success!!","Category is added Successfully!!","success")
    },
    (error:any)=>{
      Swal.fire("Error!!","Server Error","error")
    }
  )
}

}
