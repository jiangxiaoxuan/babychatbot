import { TestBed } from '@angular/core/testing';

import { MathAgent } from './math.agent';
import { Observable, pipe } from 'rxjs';
import { HandleInputResult } from './handle-input-result';

describe('MathAgent', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const agent: MathAgent = TestBed.get(MathAgent);
    expect(agent).toBeTruthy();
  });

  it('should handle user input', () => {
    const agent: MathAgent = TestBed.get(MathAgent);
    const observable: Observable<HandleInputResult> = agent.handleInput('math');
    observable.subscribe(result => {
      expect(result.bailout).toBeFalsy();
      expect(result.reply).toBeDefined();
    });
  });

  it('should handle wrong user answer', () => {
    const agent: MathAgent = TestBed.get(MathAgent);
    agent.handleInput('math').subscribe(unused => {
      agent.state.answer = 1;
      agent.handleInput('1').subscribe(result => {
        expect(result.bailout).toBeTruthy();
        expect(result.reply).toBe('You are correct!');
      });
    });
  });
});
