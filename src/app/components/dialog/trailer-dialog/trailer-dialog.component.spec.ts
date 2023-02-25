import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerDialogComponent } from './trailer-dialog.component';

describe('TrailerDialogComponent', () => {
  let component: TrailerDialogComponent;
  let fixture: ComponentFixture<TrailerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrailerDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
