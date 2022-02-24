import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private category:CategoryService,private snack:MatSnackBar) { }
categories: any=[]
ngOnInit(): void {
  this.category.categories().subscribe(
    (data:any)=>{

      this.categories=data;
      console.log(data);
      

    },
    (error:any)=>{
      console.log(error);
      this.snack.open("Error in data loading!!","ok",{
        duration:3000
      })
    }
  )
}

}
