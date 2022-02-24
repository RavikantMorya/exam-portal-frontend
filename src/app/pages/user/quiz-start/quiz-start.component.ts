import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit {

  qId;
  questions;
  marksGot=0;
  correctAnswers=0;
  attempted=0;
  isSubmitted=false; //keep track whether wuiz has been submitted or not
  timer; //keeps track of time for the quiz
  

  //object for saving the result of attempted quiz
  user_id;
  quiz_id;
 public result={
   score:0,
   quiz:{
    qid:''
   },
   user:{
     id:''
   }
 };


  constructor(private locationStrategy: LocationStrategy,
              private _route:ActivatedRoute,
              private _question:QuestionService,
              private _login:LoginService,
              private _result:ResultService
              ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId= this._route.snapshot.params.qid;    
    this.user_id=this._login.getUser().id;
    this.quiz_id=Number(this.qId)
    this.loadQuestions();
  }


  //fetch the questions
  loadQuestions()
  {
    this._question.getMaxQuestions(this.qId).subscribe(
      (data)=>{
        this.questions=data; 
        this.timer=this.questions.length*2*60 ;//each questions are of 2 marks and converting the time into seconds
      this.startTimer();
      },
      (error)=>{
  console.log(error);

      }
    )
  }

  //diable back button
  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }

  public evaluateQuiz()
  {
   //do calculation

   this._question.evalQuiz(this.questions).subscribe(
     (data:any)=>{
         this.attempted=data.attemptedQuestions;
         this.correctAnswers=data.correctAnswers;
         this.marksGot=Math.round((data.marksGot + Number.EPSILON) * 100) / 100 ;
         this.result.user.id=this.user_id;
         this.result.quiz.qid=this.quiz_id;
         this.result.score=this.marksGot;
             
        //save the result to the database
        this._result.saveResult(this.result).subscribe(
          (data)=>{
                console.log(JSON.stringify(data));       
          },
          (error)=>{
            console.log(error);
            
          }
         )
      },
     (error)=>{
        console.log(error);      
     }
   )

   //  this.questions.forEach(q => {

    //    if(q.givenAnswer==q.answer)
    //    {
    //        this.correctAnswers++;
    //        let markOfSingleQuestion=  this.questions[0].quiz.maxMarks/ this.questions[0].quiz.numberOfQuestions;
    //        this.marksGot+=markOfSingleQuestion;
    //    }
      
    //    if(q.givenAnswer.trim()!='')
    //    {
    //      this.attempted++;
    //    }

    //  });

    //  console.log("Attempted Questions: ",this.attempted);
    //  console.log("Correct Questions: ",this.correctAnswers);
    //  console.log("Your Marks: ",this.marksGot);

  }

  //submit quiz calculations 
   public submitQuiz()
    {
      Swal.fire(
        {
          icon:"question",
          title:"Are You Sure to Submit the Quiz",
          confirmButtonText:"Submit",
          showCancelButton:true,
        }
      ).then(
        (res)=>{
          if(res.isConfirmed)
          {             
             this.isSubmitted=true; 
              this.evaluateQuiz();
          }
        }
      );

  
    }

    //set the value of timer so that progress can be dynamic
    startTimer()
    {
       let t=window.setInterval(
          ()=>{
            if(this.timer<=0)
            {
              if(!this.isSubmitted){
                    this.evaluateQuiz();
                  this.isSubmitted=true;
                }
              clearInterval(t);
            }
            else
            {
              this.timer--;
            }
          },1000
        )
    }

    //format the time from seconds to HH:MM::SS
    getFormattedTime()
    {

      var h = Math.floor(this.timer / 3600);
      var m = Math.floor(this.timer % 3600 / 60);
      var s = Math.floor(this.timer % 3600 % 60);
  
      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      return hDisplay + mDisplay + sDisplay;

    }

    //print the result
    public printPage()
    {
      window.print();
    }

}
