import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizePageComponent } from './authorize-page.component';

describe('AuthorizePageComponent', () => {
  let component: AuthorizePageComponent;
  let fixture: ComponentFixture<AuthorizePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
