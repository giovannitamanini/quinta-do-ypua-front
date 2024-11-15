import { TestBed } from '@angular/core/testing';

import { ComodidadesService } from './comodidades.service';

describe('ComodidadesService', () => {
  let service: ComodidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComodidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
