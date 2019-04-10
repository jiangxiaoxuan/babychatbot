import { Injectable } from '@angular/core';
import { AgentState, Agent } from './agent';
import { Observable, of } from 'rxjs';
import { HandleInputResult } from './handle-input-result';

class SayState implements AgentState {
  userMessage: string;
  confirmation: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SayAgent implements Agent {
  intentName = 'SAY';
  state: SayState;

  newState(): AgentState {
    if (this.state === undefined) {
     this.state = new SayState();
    }
    return this.state;
  }


  isAgentIntention(message: string): boolean {
    return message.toLowerCase().startsWith('say');
  }

  handleInput(state: AgentState, message: string): Observable<HandleInputResult> {
    const sayState = state as SayState;
    const result = new HandleInputResult();
    if (!sayState.confirmation) {
      sayState.userMessage = message.substring(4);
      sayState.confirmation = true;
      result.reply = 'Do you want me to say ' + sayState.userMessage + '?';
      return of(result);
    }

    if (message.toLowerCase() === 'yes') {
      result.reply = sayState.userMessage;
    } else {
      result.reply = 'OK, good bye.';
    }

    result.bailout = true;
    sayState.userMessage = '';
    sayState.confirmation = false;

    return of(result);
  }
}
