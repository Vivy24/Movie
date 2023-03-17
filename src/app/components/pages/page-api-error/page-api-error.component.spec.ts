import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PageApiErrorComponent } from './page-api-error.component';

describe('PageApiErrorComponent', () => {
  let component: PageApiErrorComponent;
  let fixture: ComponentFixture<PageApiErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PageApiErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageApiErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
