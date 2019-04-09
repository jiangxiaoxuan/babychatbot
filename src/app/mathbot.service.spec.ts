import { TestBed } from '@angular/core/testing';

import { MathbotService } from './mathbot.service';

describe('MathbotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MathbotService = TestBed.get(MathbotService);
    expect(service).toBeTruthy();
  });
});
