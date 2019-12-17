import { TestBed } from '@angular/core/testing';

import { HistoryEventService } from './history-event.service';

describe('HistoryEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoryEventService = TestBed.get(HistoryEventService);
    expect(service).toBeTruthy();
  });
});
