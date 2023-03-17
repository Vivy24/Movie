import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatProgressSpinnerModule,
  MatSpinner,
} from '@angular/material/progress-spinner';

import { MainpageComponent } from './mainpage.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Movie, MovieDetail } from 'src/app/models/model';
import { sampleMovie, sampleMovieDetail } from 'src/mockedData/movie';
import { Component, Input } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-landing-card',
  template: '',
})
class LandingCardComponent {
  @Input() movie?: Movie;
  @Input() movieDetail?: MovieDetail;
  @Input() type?: string;
  @Input() mainPage?: string;
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

describe('MainpageComponent', () => {
  const lastestMovie = sampleMovie;
  const lastestMovieDetail = sampleMovieDetail;
  let component: MainpageComponent;
  let fixture: ComponentFixture<MainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatProgressSpinnerModule],
      declarations: [
        MainpageComponent,
        LandingCardComponent,
        SlideshowComponent,
      ],
      providers: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpageComponent);
    component = fixture.componentInstance;
    component.loadIndicatorService.resourceAndDataLoaded$ = of(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-landing-card with condition', () => {
    expect(fixture.debugElement.query(By.css('app-landing-card'))).toBeFalsy();
    component.latestMovie = lastestMovie;
    component.latestMovieDetail = lastestMovieDetail;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-landing-card'))).toBeTruthy();
  });

  it('should render the trendingMovies when trendingMovieList length > 0 ', () => {
    expect(fixture.debugElement.query(By.css('.trendingMovies'))).toBeFalsy();
    component.trendingMoviesList = [lastestMovie];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.trendingMovies'))).toBeTruthy();
  });

  it('should render the onAir when onAirMoviesList length > 0 ', () => {
    expect(fixture.debugElement.query(By.css('.onAir'))).toBeFalsy();
    component.onAirMoviesList = [lastestMovie];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.onAir'))).toBeTruthy();
  });

  it('should render the topRated when topRatedMovieList length > 0 ', () => {
    expect(fixture.debugElement.query(By.css('.topRated'))).toBeFalsy();
    component.topRatedMovieList = [lastestMovie];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.topRated'))).toBeTruthy();
  });

  it('should show loading icon when grabbing resource from API', () => {
    expect(fixture.debugElement.query(By.css('mat-spinner'))).toBeFalsy();
    component.loadIndicatorService.resourceAndDataLoaded$ = of(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('mat-spinner'))).toBeTruthy();
  });
});
