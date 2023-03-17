import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthorizePageComponent } from './authorize-page.component';

describe('AuthorizePageComponent', () => {
  let component: AuthorizePageComponent;
  let fixture: ComponentFixture<AuthorizePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [AuthorizePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
