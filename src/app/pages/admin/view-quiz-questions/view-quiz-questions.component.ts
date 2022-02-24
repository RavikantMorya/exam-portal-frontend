import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions: any=[]
  constructor(private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {

    this.qId= this._route.snapshot.params.qid;
    this.qTitle=this._route.snapshot.params.title;

    this._question.getQuestion(this.qId).subscribe(
      (data:any)=>{
          this.questions=data;
          console.log(this.questions);
          
      },
      (error:any)=>{
          console.log(error);
          
      }
    )    
  }


  //delete the question
  public deleteQuestion(quesId:any){

    //show confirmation box
    Swal.fire(
      {
        icon:'info',
        title:"Are You Sure?",
        showCancelButton:true,
        confirmButtonText:'Delete'
      }
    ).then(
      (result)=>{
         //delete the question
        if(result.isConfirmed)
        {
          this._question.deleteQuestion(quesId).subscribe(
            (data:any)=>{
              this.questions=this.questions.filter((q:any)=> q.quesid!=quesId)
                  Swal.fire("Success!!","Question Deleted","success")
              },
            (error:any)=>{
                Swal.fire("Error!!","Error in deleting questions","error");
                console.log(error);
              }
          )

        }
      }
    )




  }

}
