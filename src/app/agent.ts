import { HandleInputResult } from './handle-input-result';
import { Observable } from 'rxjs';

export interface AgentState { }

export interface Agent {
  intentName: string;
  state: AgentState;

  newState(): AgentState;
  isAgentIntention(message: string): boolean;
  handleInput(state: AgentState, message: string): Observable<HandleInputResult>;
}
