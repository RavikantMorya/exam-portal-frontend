import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ResultService } from 'src/app/services/result.service';
import { QuizStartComponent } from '../quiz-start/quiz-start.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  constructor(private _result:ResultService,
    private _login:LoginService
    ) { }

  result=null;
  id=0;
  ngOnInit(): void {
  
    this.id=this._login.getUser().id;
  
this._result.getResultByUser(this.id).subscribe(
      (data)=>{
        this.result=data;     
      },
      (error)=>{
          console.log(error); 
      }
    )
  
  }

}
