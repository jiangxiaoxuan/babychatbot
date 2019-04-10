import { Injectable } from '@angular/core';
import { AgentState, Agent } from './agent';
import { Observable, of } from 'rxjs';
import { HandleInputResult } from './handle-input-result';
import { MathbotService } from './mathbot.service';
import { Mathquiz } from './mathquiz';


class MathState implements AgentState {
  isValidate: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MathAgent implements Agent {


 constructor(private mathService: MathbotService) {}

  intentName = 'MATH';
  state: MathState;
  quiz: Mathquiz;
  question: string;
  answer: number;


  newState(): AgentState {
    if (this.state === undefined) {
      this.state = new MathState();
    }
    return this.state;
  }

  isAgentIntention(message: string): boolean {
    return message.toLowerCase() === 'math';
  }

  handleInput(state: AgentState, message: string): Observable<HandleInputResult> {
    const mathState = state as MathState;
    const result = new HandleInputResult();
    if (!mathState.isValidate) {
      this.getMathQuiz();
      result.reply = this.question;
      this.state.isValidate = true;
      return of(result);
    }

    if (Number(message) === this.answer) {
      result.reply = 'You are correct!';
      mathState.isValidate = false;
      result.bailout = true;
    } else {
      result.reply = 'Try again..';
    }

    return of(result);
  }

  getMathQuiz(): void {
    this.quiz = this.mathService.getMathQuiz();
    this.question = this.quiz.question;
    this.answer = Number(this.quiz.answer);
  }
}
