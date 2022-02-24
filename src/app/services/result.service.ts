import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private _http:HttpClient) { }

public saveResult(result)
{
  return this._http.post(`${baseUrl}/result/`,result);
}

public getResult()
{
  return this._http.get(`${baseUrl}/result/`);
}


public getResultByUser(user_id)
{
  return this._http.get(`${baseUrl}/result/user/${user_id}`);
}

public getResultByQuiz(quiz_id)
{
  return this._http.get(`${baseUrl}/result/quiz/${quiz_id}`);
}


public getResultByUserAndQuiz(user_id,quiz_id){
  return this._http.get(`${baseUrl}/result/${user_id}/${quiz_id}`);
}

}



