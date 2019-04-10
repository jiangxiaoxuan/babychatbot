import { Injectable } from '@angular/core';
import { Mathquiz } from './mathquiz';
import { QUIZZES } from './mock-quizzes';

@Injectable({
  providedIn: 'root'
})
export class MathbotService {

  constructor() { }

  getMathQuiz(): Mathquiz {
    const randomQuiz = QUIZZES[Math.round(Math.random() * (QUIZZES.length - 1))];
    console.log(randomQuiz);
    return randomQuiz;
  }
}
