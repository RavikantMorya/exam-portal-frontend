import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  //load all the quizes
  public getQuizzes()
  {
    return this.http.get(`${baseUrl}/quiz/`)
  }

  //load single quize
  public getQuiz(qid:any)
  {
    return this.http.get(`${baseUrl}/quiz/${qid}`)
  }

  //update the quiz
  public updateQuiz(quiz:any)
  {
    return this.http.put(`${baseUrl}/quiz/`,quiz)
  }

  //add a quiz
 public addQuiz(quizData:any)
{
  return this.http.post(`${baseUrl}/quiz/`,quizData);
}

//delete the quiz

public deleteQuiz(qId:any)
{
  return this.http.delete(`${baseUrl}/quiz/${qId}`);
}

//get all the quizzes of a category
public getQuizzesOfCategory(catId:any)
{
  return this.http.get(`${baseUrl}/quiz/category/${catId}`);
}

//get all the active quizzes
public getActiveQuizzes()
{
  return this.http.get(`${baseUrl}/quiz/active`);
}


//get all the active quizzes of a specific category
public getActiveQuizzessOfCategory(catId:any)
{
  return this.http.get(`${baseUrl}/quiz/category/active/${catId}`)
}


}
