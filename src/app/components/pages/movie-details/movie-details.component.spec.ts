import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { Movie, MovieDetail, Video } from 'src/app/models/model';
import { MovieDetailsComponent } from './movie-details.component';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, MatIconModule],
      declarations: [MovieDetailsComponent, LandingCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
