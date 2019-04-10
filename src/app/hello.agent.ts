import { Injectable } from '@angular/core';
import { Agent } from './agent';
import { Observable, of } from 'rxjs';
import { HandleInputResult } from './handle-input-result';


@Injectable({
  providedIn: 'root'
})
export class HelloWorldAgent implements Agent {
  intentName = 'HELLO';

  isAgentIntention(message: string): boolean {
    return message.toLowerCase() === 'hello';
  }

  handleInput(message: string): Observable<HandleInputResult> {
    const result = new HandleInputResult();
    result.reply = 'Hello World';
    result.bailout = true;
    return of(result);
  }
}
