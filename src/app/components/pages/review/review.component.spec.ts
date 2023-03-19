import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

import { ReviewComponent } from './review.component';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let paramsSubject = new BehaviorSubject({
    type: 'tvshow',
    id: 1234,
  });
  let route: ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatIconModule],
      declarations: [ReviewComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject,
          },
        },
      ],
    }).compileComponents();
    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign component inside subscription of params', () => {
    route.params.subscribe((value) => {
      const type = value['type'];
      const id = value['id'];
      expect(component.type).toEqual(type.toLowerCase());
      expect(component.id).toEqual(id);
    });
  });
});
