import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiControllerService } from './api-controller.service';

describe('ApiControllerService', () => {
  let service: ApiControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
