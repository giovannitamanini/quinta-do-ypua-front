import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasDialogComponent } from './reservas-dialog.component';

describe('ReservasDialogComponent', () => {
  let component: ReservasDialogComponent;
  let fixture: ComponentFixture<ReservasDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservasDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
