import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  qId:any;
  qTitle:any;
  
  question={
    quiz:{
      qid:'',
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }
  constructor(private _route:ActivatedRoute,private _ques:QuestionService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
      this.qId=this._route.snapshot.params.qid;
      this.qTitle=this._route.snapshot.params.title;
      this.question.quiz['qid']=this.qId;
      console.log(this.qTitle);
      
  }

public addQuestion()
{

  //validate question content and options

  if(this.question.content.trim()=='' || this.question.content==undefined)
  {
    this._snack.open("content is required","ok",{
      duration:3000
    })
  }

  //validate option1
  if(this.question.option1.trim()=='' || this.question.option1==undefined)
  {
    this._snack.open("option1 is required","ok",{
      duration:3000
    });
    return;
  }
//validate option2
if(this.question.option2.trim()=='' || this.question.option2==undefined)
{
  this._snack.open("option2 is required","ok",{
    duration:3000
  });
  return;
}


  //validate option3
  if(this.question.option3.trim()=='' || this.question.option3==undefined)
  {
    this._snack.open("option3 is required","ok",{
      duration:3000
    });
    return;
  }
//validate option4
if(this.question.option4.trim()=='' || this.question.option4==undefined)
{
  this._snack.open("option4 is required","ok",{
    duration:3000
  });
  return;
}

//validate answer
if(this.question.answer.trim()=='' || this.question.answer==undefined)
{
  this._snack.open("answer is required","ok",{
    duration:3000
  });
  return;
}

  //add the questions
  this._ques.addQuestion(this.question).subscribe(
    (data)=>{
      console.log(data);
      Swal.fire("Success!!","Question was added","success");   
      this.question={
        quiz:{
          qid:'',
        },
        content:'',
        option1:'',
        option2:'',
        option3:'',
        option4:'',
        answer:''
      }
    },
    (error)=>{
      Swal.fire("Error!!","Error in adding the question","error");  
console.log(error);

    }
  )
}

}
