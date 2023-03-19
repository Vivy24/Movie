import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { Cast, Movie, MovieDetail, Video } from 'src/app/models/model';
import { MovieDetailsComponent } from './movie-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import {
  sampleCast,
  sampleMovie,
  sampleMovieDetail,
  sampleReview,
  sampleVideo,
} from 'src/mockedData/movie';
import { SafePipe } from 'src/app/pipe/safe.pipe';

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

@Component({
  selector: 'app-slideshow',
  template: '',
})
class SlideshowComponent {
  @Input() title?: string;
  @Input() movieList?: Array<Movie>;
  @Input() tvShowList?: Array<Movie>;
}

@Component({
  selector: 'app-reviews-card',
  template: '',
})
class ReviewsCardComponent {}

@Component({
  selector: 'app-cast',
  template: '',
})
class castInfo {
  @Input() castInfo?: Cast;
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
      declarations: [
        castInfo,
        ReviewsCardComponent,
        SlideshowComponent,
        MovieDetailsComponent,
        LandingCardComponent,
        SafePipe,
      ],
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

  it('should show error when this.error is true', () => {
    expect(fixture.debugElement.query(By.css('.errorPage'))).toBeFalsy();
    component.error = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.errorPage'))).toBeTruthy();
  });

  it('should render the landing-card of the movie', () => {
    component.movieDetail = sampleMovieDetail;
    component.movie = sampleMovie;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-landing-card'))).toBeTruthy();
  });

  it('should render the castSection', () => {
    expect(fixture.debugElement.query(By.css('.castSection'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.castList'))).toBeFalsy();
    component.castList = [sampleCast];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.castSection'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.castList'))).toBeTruthy();
  });

  it('should render the review link only when it has review', () => {
    expect(fixture.debugElement.query(By.css('.reviewSection a'))).toBeFalsy();
    component.reviewList = [sampleReview];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.reviewSection a'))).toBeTruthy();
  });

  it('should render the video when there is a video', () => {
    expect(fixture.debugElement.query(By.css('.videoFilm p'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('iframe'))).toBeFalsy();
    component.firstVideo = sampleVideo;
    component.movieVideoList = [sampleVideo];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('iframe'))).toBeTruthy();
  });

  it('should render recommend film when there is a recommendation list', () => {
    expect(
      fixture.debugElement.query(By.css('.recommendationsFilm app-slideshow'))
    ).toBeFalsy();
    component.movieRecommendationList = [sampleMovie];
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.recommendationsFilm app-slideshow'))
    ).toBeTruthy();
  });
});
