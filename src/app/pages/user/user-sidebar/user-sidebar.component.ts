import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {


category:any;
  constructor(private _cat:CategoryService) { }

  ngOnInit(): void {
 
    this._cat.categories().subscribe(
      (data)=>{
          this.category=data;          
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

}
