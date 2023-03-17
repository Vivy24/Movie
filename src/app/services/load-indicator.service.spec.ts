import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoadIndicatorService } from './load-indicator.service';

describe('LoadIndicatorService', () => {
  let service: LoadIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoadIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
