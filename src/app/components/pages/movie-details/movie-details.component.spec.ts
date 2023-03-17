import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { Movie, MovieDetail, Video } from 'src/app/models/model';
import { MovieDetailsComponent } from './movie-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-landing-card',
  templateUrl: '../../sections/landing-card/landing-card.component.html',
})
class LandingCardComponent {
  @Input() movie?: Movie;
  @Input() movieDetail?: MovieDetail;
  @Input() type?: string;
  @Input() trailer?: Video;
}

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let route: ActivatedRoute;
  const paramsSubject = new BehaviorSubject({
    type: 'movie',
    id: '1234',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatIconModule],
      declarations: [MovieDetailsComponent, LandingCardComponent],
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

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    component.loadIndicatorService.resourceAndDataLoaded$ = of(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reload movie information when navigating into different movie/tvshow', () => {
    spyOn(component.apiController, 'getMovieDetailByMovie');
    spyOn((component as any).apiController, 'getMovieCastById');
    spyOn((component as any).apiController, 'getMovieReviewById');
    spyOn((component as any).apiController, 'getRecommendationMovieById');
    spyOn((component as any).apiController, 'getVideoById');

    route.params.subscribe((value) => {
      const type = value['type'];
      const id = value['id'];
      expect(component.type).toEqual(type.toLowerCase());
      expect(component.movieId).toEqual(id);
    });
  });
});
