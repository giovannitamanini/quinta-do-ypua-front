import { TestBed } from '@angular/core/testing';

import { AcomodacoesService } from './acomodacoes.service';

describe('AcomodacoesService', () => {
  let service: AcomodacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcomodacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
