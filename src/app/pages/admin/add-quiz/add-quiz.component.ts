import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  public quizData=
  {
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    }
  }

  constructor(private cat:CategoryService,private quiz :QuizService,private snack:MatSnackBar) { }
category: any=[]
  ngOnInit(): void {
    //load data in selectbox
    this.cat.categories().subscribe(
      (data:any)=>{
          this.category=data;
      },
      (error:any)=>{

        Swal.fire("Error!!","Error in loading categories","error");
        return;
      }
    );
  }


 
  //validation and add the quiz
  public addQuiz()
  {

    //validate title
    if(this.quizData.title.trim()=='' || this.quizData.title==null)
    {
        this.snack.open("tittle is required!!","ok",{
          duration:3000
        });
        return;
    }
    //validate description
    if(this.quizData.description.trim()=='' || this.quizData.description==null)
    {
        this.snack.open("description is required!!","ok",{
          duration:3000
        });
        return;
    }

    //validate maxMarks
    if(this.quizData.maxMarks.trim()=='' || this.quizData.maxMarks==null)
    {
        this.snack.open("maMarks is required!!","ok",{
          duration:3000
        });
        return;
    }
  //validate no of question
  if(this.quizData.numberOfQuestions.trim()=='' || this.quizData.numberOfQuestions==null)
  {
      this.snack.open("numberOf Questions is required!!","ok",{
        duration:3000
      });
      return;
  }
//add the quiz
    this.quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        console.log(this.quizData);
       this.quizData=
        {
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:'',
          }
        }
        Swal.fire("Success!!","Quiz added successfully","success");
      },
      (error:any)=>{
      console.log(error);
      Swal.fire("Error","Error in adding the quiz ","error");
      }
    );

  } 

}
