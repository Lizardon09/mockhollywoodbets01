import { TestBed } from '@angular/core/testing';

import { BetgamesService } from './betgames.service';

describe('BetgamesService', () => {
  let service: BetgamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetgamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
