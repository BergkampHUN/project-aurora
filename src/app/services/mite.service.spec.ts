import { TestBed } from '@angular/core/testing';

import { MiteService } from './mite.service';

describe('MiteService', () => {
  let service: MiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
