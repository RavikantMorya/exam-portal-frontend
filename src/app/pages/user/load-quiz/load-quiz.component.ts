import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:any;
  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService
  ) { }

  ngOnInit(): void {

// http://localhost:4200/user-dashboard/0
//the component will be loaded only once but we want to change the route everytime when wec click on the quiz cateogry
// so we will subscribe the route params

this._route.params.subscribe(
  (params)=>{
    this.catId= params.catId;
    if(this.catId==0)
    {
        this._quiz.getActiveQuizzes().subscribe(
          (data)=>{
            this.quizzes=data;
            console.log(this.quizzes);
          },
          (error)=>{
              console.log(error);
          }
        )
    }
    else{
      console.log("load specific quiz"); 
      this._quiz.getActiveQuizzessOfCategory(this.catId).subscribe(
        (data)=>{
            this.quizzes=data;
        },
        (error)=>{
          console.log(error);
          
        }
      )
    }

  }
);




}

}
