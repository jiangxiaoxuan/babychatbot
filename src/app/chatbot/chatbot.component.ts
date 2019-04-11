import { Component, OnInit } from '@angular/core';
import { HelloWorldAgent } from '../hello.agent';
import { SayAgent } from '../say.agent';
import { MathAgent } from '../math.agent';
import { JokeAgent } from '../joke.agent';
import { HandleInputResult } from '../handle-input-result';
import { Agent } from '../agent';


const WAITING_INTENT = 'waiting';

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
  intent = WAITING_INTENT;
  agents: Agent[] = [this.helloAgent, this.sayAgent, this.mathAgent, this.jokeAgent];

  constructor(private helloAgent: HelloWorldAgent,
              private sayAgent: SayAgent,
              private mathAgent: MathAgent,
              private jokeAgent: JokeAgent) {
  }

  ngOnInit() {}

  onEnter() {
    const userInput = this.userInput;
    this.userInput = '';
    this.chatMessages.push(userInput);

    let currentAgent: Agent;

    if (this.intent !== WAITING_INTENT) {
      currentAgent = this.getAgentByIntentName(this.intent);
    } else {
      for (const agent of this.agents) {
        if (agent.isAgentIntention(userInput)) {
          this.intent = agent.intentName;
          currentAgent = agent;
          break;
        }
      }
    }

    if (currentAgent === undefined) {
      this.chatMessages.push('Sorry, I don\'t understand...');
      return;
    }

    currentAgent.handleInput(userInput)
        .subscribe(handleInputResult => {
            this.chatMessages.push(handleInputResult.reply);
            if (handleInputResult.bailout) {
              this.intent = WAITING_INTENT;
            }
          });
  }

  private getAgentByIntentName(intent: string): Agent {
    for (const agent of this.agents) {
      if (agent.intentName === intent) {
        return agent;
      }
    }
    return undefined;
  }
}
