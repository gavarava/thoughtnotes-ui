import { TestBed } from '@angular/core/testing';

import { DaynotesService } from './daynotes.service';

describe('DaynotesService', () => {
  let service: DaynotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaynotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
