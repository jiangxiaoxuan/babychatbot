import { Component, OnInit } from '@angular/core';
import { HelloWorldAgent } from '../hello.agent';
import { SayAgent } from '../say.agent';
import { MathAgent } from '../math.agent';
import { JokeAgent } from '../joke.agent';
import { HandleInputResult } from '../handle-input-result';
import { Agent } from '../agent';

const WAITING_INTENT = 'waiting';
const BOT_NAME = 'Bunnie the Agent';
const BOT_URL = 'https://avatars1.githubusercontent.com/u/16955489?s=88&v=4';

class ChatMessage {
  constructor(private userName: string, private userURL, private message: string) { }
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  name = 'Andy';
  nameUrl = 'https://avatars0.githubusercontent.com/u/5508096?s=88&v=4';

  chatMessages: ChatMessage[] = [
    new ChatMessage(BOT_NAME, BOT_URL, 'Hello'),
    new ChatMessage(BOT_NAME, BOT_URL, 'How are you?')
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
    this.chatMessages.push(new ChatMessage(this.name, this.nameUrl, userInput));

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
      this.chatMessages.push(new ChatMessage(BOT_NAME, BOT_URL, 'Sorry, I don\'t understand...'));
      return;
    }

    currentAgent.handleInput(userInput)
        .subscribe(handleInputResult => {
            this.chatMessages.push(new ChatMessage(BOT_NAME, BOT_URL, handleInputResult.reply));
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
