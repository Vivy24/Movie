import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LoadIndicatorService } from './load-indicator.service';

describe('LoadIndicatorService', () => {
  let service: LoadIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(LoadIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
