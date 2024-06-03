import { TestBed } from '@angular/core/testing';

import { HospedesService } from './hospedes.service';

describe('HospedesService', () => {
  let service: HospedesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospedesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
