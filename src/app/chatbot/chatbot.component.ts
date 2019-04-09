import { Component, OnInit } from '@angular/core';
import { MathbotService } from '../mathbot.service';
import { Mathquiz } from '../mathquiz';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  name = "Freya";

  chatMessages: string[] = [
    "Hello",
    "How are you?"
  ]

  userInput: string;
  output: string;
  quiz: Mathquiz;
  answer: number;
  status = "waiting";

  constructor(private mathbotService: MathbotService) {}

  ngOnInit() {}

  onEnter() {
    this.chatMessages.push(this.userInput);
    if (this.status === "waiting" && this.userInput === "Math") {
      this.getMathQuiz();
      this.status = "validating";
    } else if (this.status == "validating" && Number(this.userInput) !== NaN) {
      if (Number(this.userInput) === this.answer) {
        this.output = "You are correct!";
        this.status = "waiting";
      } else {
        this.output = "Try again!";
      }
    } else {
      this.output = "Sorry, I don't understand...";
    }
    this.userInput = "";
    this.chatMessages.push(this.output);

  }


  getMathQuiz(): void {
    this.quiz = this.mathbotService.getMathQuiz();
    this.output = this.quiz.question;
    this.answer = Number(this.quiz.answer);
  }


}
