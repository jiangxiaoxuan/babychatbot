import { HandleInputResult } from './handle-input-result';
import { Observable } from 'rxjs';

export interface Agent {
  readonly intentName: string;

  isAgentIntention(message: string): boolean;
  handleInput(message: string): Observable<HandleInputResult>;
}
