import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPageComponent } from './video-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute } from '@angular/router';

describe('VideoPageComponent', () => {
  let component: VideoPageComponent;
  let fixture: ComponentFixture<VideoPageComponent>;
  let paramsSubject = new BehaviorSubject({
    type: 'tvshow',
    id: 1234,
  });
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatIconModule],
      declarations: [VideoPageComponent],
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
    fixture = TestBed.createComponent(VideoPageComponent);
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
      expect(component.movieID).toEqual(id);
    });
  });
});
