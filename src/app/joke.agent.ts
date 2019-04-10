import { Injectable } from '@angular/core';
import { Agent } from './agent';
import { Observable, of } from 'rxjs';
import { HandleInputResult } from './handle-input-result';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JokeAgent implements Agent {
  intentName = 'JOKE';
  constructor(private http: HttpClient) {}

  isAgentIntention(message: string): boolean {
    return message.toLowerCase().startsWith('tell me a joke');
  }

  handleInput(message: string): Observable<HandleInputResult> {
    return this.http.get<any>('http://api.icndb.com/jokes/random').pipe(
      map(jsonResult => {
        const result = new HandleInputResult();
        result.reply = jsonResult.value.joke;
        result.bailout = true;
        return result;
      })
    );
  }

  // handleInput(message: string): Observable<HandleInputResult> {
  //   let first: Observable<any> = this.http.get<any>("http://api.icndb.com/jokes/random");
  //   let second: Observable<HandleInputResult> = first.pipe(
  //     map(jsonResult => {
  //       const result = new HandleInputResult();
  //       result.reply = jsonResult.value.joke;
  //       result.bailout = true;
  //       return result;
  //     }),
  //   );
  // }
}
