import { TestBed } from '@angular/core/testing';

import { GeoclimaticService } from './geoclimatic.service';

describe('GeoclimaticService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoclimaticService = TestBed.get(GeoclimaticService);
    expect(service).toBeTruthy();
  });
});
