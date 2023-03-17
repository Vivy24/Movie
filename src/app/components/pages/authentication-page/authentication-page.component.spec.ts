import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationPageComponent } from './authentication-page.component';

describe('AuthenticationPageComponent', () => {
  let component: AuthenticationPageComponent;
  let fixture: ComponentFixture<AuthenticationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AuthenticationPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('grantAccess button should trigger grantAccess function', () => {
    spyOn(component, 'grantAccess');
    const btn = fixture.debugElement.query(By.css('button')).nativeElement;
    btn.dispatchEvent(new Event('click'));
    expect(component.grantAccess).toHaveBeenCalled();
  });

  it('', () => {
    spyOn((component as any).authenticationService, 'directToAuthorization');
    component.grantAccess();
    fixture.detectChanges();
    expect(
      (component as any).authenticationService.directToAuthorization
    ).toHaveBeenCalled();
  });
});
