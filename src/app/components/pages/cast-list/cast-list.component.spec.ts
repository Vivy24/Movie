import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

import { CastListComponent } from './cast-list.component';

describe('CastListComponent', () => {
  let component: CastListComponent;
  let fixture: ComponentFixture<CastListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, MatIconModule],
      declarations: [CastListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
