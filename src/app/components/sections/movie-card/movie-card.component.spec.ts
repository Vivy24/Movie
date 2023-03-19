import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sample } from 'rxjs';
import { sampleMovie } from 'src/mockedData/movie';

import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render content match with the component', () => {
    component.movie = sampleMovie;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.content h4')).nativeElement
        .textContent
    ).toEqual(sampleMovie.title);
  });
});
