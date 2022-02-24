import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId;
  quizzes;
  MarkOfEachQuestion;
 
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router) { }

  ngOnInit(): void {

    this.qId=this._route.snapshot.params.qid;
    this._quiz.getQuiz(this.qId).subscribe(
      (data)=>{
          this.quizzes=data;
          this. MarkOfEachQuestion=this.quizzes.maxMarks/this.quizzes.numberOfQuestions;
          this. MarkOfEachQuestion= this. MarkOfEachQuestion.toFixed(2);
          console.log(this.quizzes);
          
      },
      (error)=>{
        console.log(error);
        
      }
    )
  
  }

  public startQuiz()
  {
   Swal.fire(
     {
       icon:"info",
       showCancelButton:true,
       confirmButtonText:"Start",
       title:"Are you ready to take the quiz"
     }
   ).then(
     (result)=>{
       if(result.isConfirmed)
       {
          this._router.navigate(["/start/",this.qId]);
       }
     }
   )
  }

}
