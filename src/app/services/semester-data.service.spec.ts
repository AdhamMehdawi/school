import { TestBed } from '@angular/core/testing';

import { SemesterDataService } from './semester-data.service';

describe('SemesterDataService', () => {
  let service: SemesterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemesterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
