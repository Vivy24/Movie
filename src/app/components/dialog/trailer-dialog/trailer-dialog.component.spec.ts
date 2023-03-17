import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { SafePipe } from 'src/app/pipe/safe.pipe';

import { TrailerDialogComponent } from './trailer-dialog.component';

describe('TrailerDialogComponent', () => {
  let component: TrailerDialogComponent;
  let fixture: ComponentFixture<TrailerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrailerDialogComponent, SafePipe],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render iframe dialog with youtube src', () => {
    const youtubeSrc = 'https://www.youtube.com/watch?v=C0DPdy98e4c';
    component.data.youtubeSrc = youtubeSrc;
    fixture.detectChanges();
    const iframe = fixture.debugElement.query(By.css('iframe')).nativeElement;
    expect(iframe.src).toEqual(youtubeSrc);
  });
});
