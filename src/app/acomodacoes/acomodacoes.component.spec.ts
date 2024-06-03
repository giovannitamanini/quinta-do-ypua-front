import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcomodacoesComponent } from './acomodacoes.component';

describe('AcomodacoesComponent', () => {
  let component: AcomodacoesComponent;
  let fixture: ComponentFixture<AcomodacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcomodacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcomodacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
