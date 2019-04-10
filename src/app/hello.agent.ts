import { Injectable } from '@angular/core';
import { AgentState, Agent } from './agent';
import { Observable, of } from 'rxjs';
import { HandleInputResult } from './handle-input-result';

class HelloWorldState implements AgentState {
  // Unused.
}

@Injectable({
  providedIn: 'root'
})
export class HelloWorldAgent implements Agent {
  intentName = 'HELLO';
  state: HelloWorldState;

  newState(): AgentState {
    return new HelloWorldState();
  }

  isAgentIntention(message: string): boolean {
    return message.toLowerCase() === 'hello';
  }

  handleInput(state: AgentState, message: string): Observable<HandleInputResult> {
    const result = new HandleInputResult();
    result.reply = 'Hello World';
    result.bailout = true;
    return of(result);
  }
}
