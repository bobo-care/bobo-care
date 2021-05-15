import { TestBed } from '@angular/core/testing';

import { BabiesService } from './babies.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BabiesService', () => {
  let service: BabiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    service = TestBed.inject(BabiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
