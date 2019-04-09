import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  name = 'Andy';

  chatMessages: string[] = [
    'Hello',
    'How are you?'
  ];

  userInput: string;

  constructor() {}

  ngOnInit() {
  }

  onEnter() {
    console.log(this.userInput);
    console.log(this.chatMessages);
    this.chatMessages.push(this.userInput);
    this.userInput = '';
  }
}
