import { TestBed } from '@angular/core/testing';

import { ThoughtnotesService } from './thoughtnotes.service';

describe('ThoughtNotesService', () => {
  let service: ThoughtnotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThoughtnotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
