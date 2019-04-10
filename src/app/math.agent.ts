import { Injectable } from '@angular/core';
import { Agent } from './agent';
import { Observable, of } from 'rxjs';
import { HandleInputResult } from './handle-input-result';
import { MathbotService } from './mathbot.service';
import { Mathquiz } from './mathquiz';


class MathState {
  isValidate: boolean;
  question: string;
  answer: number;
}

@Injectable({
  providedIn: 'root'
})
export class MathAgent implements Agent {


 constructor(private mathService: MathbotService) {}

  intentName = 'MATH';
  state: MathState;

  private getState(): MathState {
    if (this.state === undefined) {
      this.state = new MathState();
    }
    return this.state;
  }

  isAgentIntention(message: string): boolean {
    return message.toLowerCase() === 'math';
  }

  handleInput(message: string): Observable<HandleInputResult> {
    const mathState = this.getState();
    const result = new HandleInputResult();
    if (!mathState.isValidate) {
      this.getMathQuiz();
      result.reply = this.state.question;
      this.state.isValidate = true;
      return of(result);
    }

    if (Number(message) === this.state.answer) {
      result.reply = 'You are correct!';
      mathState.isValidate = false;
      result.bailout = true;
    } else {
      result.reply = 'Try again..';
    }

    return of(result);
  }

  private getMathQuiz(): void {
    const quiz = this.mathService.getMathQuiz();
    this.state.question = quiz.question;
    this.state.answer = Number(quiz.answer);
  }
}
