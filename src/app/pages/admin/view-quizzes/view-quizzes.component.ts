import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  constructor(private quiz:QuizService) { }

  quizzes: any=[]

  ngOnInit(): void {
        this.quiz.getQuizzes().subscribe(
          (data:any)=>{
              this.quizzes=data;
              console.log(this.quizzes);
          },
          (error:any)=>{
              Swal.fire("Error!!","Error in data loading","error")
          }
        );
      
      }


       //delete the quiz

  public deleteQuiz(qId:any)
  {

    //confirmation Box
   Swal.fire(
     {
       icon:'warning',
      title:'Are You Sure?',
      confirmButtonText:'Delete',
      showCancelButton:true
     } ).then((result)=>{
       if(result.isConfirmed)
       {
         //delete the quiz
         this.quiz.deleteQuiz(qId).subscribe(
          (data:any)=>{
    
            //quiz is deleted filter the deleted quiz and don't display
           this.quizzes= this.quizzes.filter((quiz:any)=>quiz.qid!=qId);
              Swal.fire("Success!!","Quiz deleted Successfully!!","success");
          },
          (error:any)=>{
            Swal.fire("Error!!","Error in deleting the quiz","error");
          }
        )
       }
     })
  }


}
