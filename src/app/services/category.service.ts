import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  
  //fetch all the categories
  public categories( )
  {
    return this.http.get(`${baseUrl}/category/`)
  }

  //add the category
  public addCategory(category: any){
    return this.http.post(`${baseUrl}/category/`,category)
  }

  //delete the category
  public deleteCategory(cat_id:any)
  {
    return this.http.delete(`${baseUrl}/category/${cat_id}`);
  }

}
