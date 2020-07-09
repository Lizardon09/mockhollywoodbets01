import { TestBed } from '@angular/core/testing';

import { BonustableService } from './bonustable.service';

describe('BonustableService', () => {
  let service: BonustableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonustableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
