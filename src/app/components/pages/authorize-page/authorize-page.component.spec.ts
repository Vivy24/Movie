import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthorizePageComponent } from './authorize-page.component';

describe('AuthorizePageComponent', () => {
  let component: AuthorizePageComponent;
  let fixture: ComponentFixture<AuthorizePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AuthorizePageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({ request_token: '123344' }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new session when user do not logged in', () => {
    spyOn(Object.getPrototypeOf(localStorage), 'getItem').and.returnValue(null);
    spyOn(component, 'createSessionAndGetUserList');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.createSessionAndGetUserList).toHaveBeenCalled();
  });

  it('should create  new session when user do not have accountID', () => {
    spyOn(component, 'createSessionAndGetUserList');
    spyOn(Object.getPrototypeOf(localStorage), 'getItem').and.callFake(
      (key: string) => {
        if (key == 'sessionID') {
          return '123131';
        }
        return null;
      }
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.createSessionAndGetUserList).toHaveBeenCalled();
  });
});
