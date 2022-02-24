import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  quesid:any;
  question:any;
  qid:any;
  quizTitle:any;
  constructor(private _route:ActivatedRoute,
    private _ques:QuestionService,
    private route:Router
    ) { }

  ngOnInit(): void {
   this.quesid= this._route.snapshot.params.quesid; 
   
//fetch the question
 this._ques.getQues(this.quesid).subscribe(
    (data)=>{
      this.question= data;
      this.qid=this.question.quiz.qid;
      this.quizTitle=this.question.quiz.title;
      console.log(this.quizTitle);
      
      console.log(this.question);
     
    },
    (error)=>{
     console.log(error);
    }
  );
}


//update the question when form is submitted

public updateQuestion()
{
  this._ques.updateQuestion(this.question).subscribe(
    (data)=>{
      Swal.fire("Success!!","Question Updated","success")
     this.route.navigate(['/admin/quiz/',this.qid,this.quizTitle]);
    },
    (error)=>{
      Swal.fire("Error!!","Error in updating the question","error")
    }
  )
}




}
