import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiControllerService } from './api-controller.service';

describe('ApiControllerService', () => {
  let service: ApiControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ApiControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
