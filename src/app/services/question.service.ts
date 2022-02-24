import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  //load all the questions
  public getQuestion(qid:any)
  {
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //load max Number of Questions for taking quiz by normal user
  public getMaxQuestions(qid)
  {
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //load a single question
  public getQues(quesId:any)
  {
    return this.http.get(`${baseUrl}/question/${quesId}`)
  }

  //add the question
  public addQuestion(question:any)
  {
      return this.http.post(`${baseUrl}/question/`,question)
  }

//update the question
public updateQuestion(question:any)
{
  return this.http.put(`${baseUrl}/question/`,question);
}

  //delete the questions
  public deleteQuestion(quesId:any)
  {
    return this.http.delete(`${baseUrl}/question/${quesId}`)
  }


  //evaluate the quiz on server
  public evalQuiz(question:any)
  {
    return this.http.post(`${baseUrl}/question/eval-quiz`,question);
  }
}
