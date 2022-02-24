import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor( private route:ActivatedRoute,
    private _quiz:QuizService,
    private _cat:CategoryService,
    private _route:Router
    ) { }

  qId=0;
  quiz:any;
  category:any;
  ngOnInit(): void {
 this.qId=this.route.snapshot.params.qid;  //  qid if from path:'quiz/:qid', in app-routing module\
 
 //fetch the quiz
 this._quiz.getQuiz(this.qId).subscribe(
   (data:any)=>{
    this.quiz=data;
    console.log(this.quiz.active);
   },
   (error:any)=>{
console.log(error);
   },
 )

 this._cat.categories().subscribe(
   (data:any)=>{
     this.category=data;
   },
   (error:any)=>{
     console.log("error in category loading"+error)
   }
 )


  }


  public updateQuiz()
  {
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Success!!","Quiz Updated","success").then((e)=>{
          this._route.navigate(['/admin/quizzes/'])
        });
      },
      (error:any)=>{
        Swal.fire("Error!!","Error in quiz update","error");
      }
    )
  }

}
