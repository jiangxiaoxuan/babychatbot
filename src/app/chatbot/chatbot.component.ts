import { Component, OnInit } from '@angular/core';
import { HelloWorldAgent } from '../hello.agent';
import { SayAgent } from '../say.agent';
import { MathAgent } from '../math.agent';
import { HandleInputResult } from '../handle-input-result';
import { Agent, AgentState } from '../agent';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  name = 'Freya';

  chatMessages: string[] = [
    'Hello',
    'How are you?'
  ];

  userInput: string;
  output: string;
  intent = 'waiting';
  agentState: AgentState;
  AGENTS: Agent[] = [this.helloAgent, this.sayAgent, this.mathAgent];

  constructor(private helloAgent: HelloWorldAgent,
              private sayAgent: SayAgent,
              private mathAgent: MathAgent) {
  }

  ngOnInit() {}

  onEnter() {
    const userInput = this.userInput;
    this.userInput = '';
    this.chatMessages.push(userInput);
    for (const agent of this.AGENTS) {
      if (agent.isAgentIntention(userInput) || this.intent === agent.intentName) {
        if (agent.isAgentIntention(userInput)) {
          this.intent = agent.intentName;
        }
        this.agentState = agent.newState();
        agent.handleInput(this.agentState, userInput)
            .subscribe(handleInputResult => {
                this.output = handleInputResult.reply;
                this.chatMessages.push(this.output);

                if (handleInputResult.bailout) {
                  this.intent = 'waiting';
                }
              });
        return;
      }
    }
    this.output = 'Sorry, I don\'t understand...';
    this.chatMessages.push(this.output);
  }
}
