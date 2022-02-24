import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

  cat_id=0;
  constructor(private category:CategoryService) { }

  ngOnInit(): void {
  }

  public formSubmit()
  {   
    this.category.deleteCategory(this.cat_id).subscribe(
      (data:any)=>{
          this.cat_id=0;
          Swal.fire("Success","category is deleted successfully","success")
      },
      (error:any)=>{
        Swal.fire("Error!!","Something went wrong","error")
      }
    );
  }
}
