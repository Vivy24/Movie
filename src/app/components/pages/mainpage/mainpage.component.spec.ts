import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatProgressSpinnerModule,
  MatSpinner,
} from '@angular/material/progress-spinner';

import { MainpageComponent } from './mainpage.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainpageComponent', () => {
  let component: MainpageComponent;
  let fixture: ComponentFixture<MainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatProgressSpinnerModule],
      declarations: [MainpageComponent],
      providers: [MatSpinner, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
