import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
