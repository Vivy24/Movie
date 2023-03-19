import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sampleReview } from 'src/mockedData/movie';

import { ReviewsCardComponent } from './reviews-card.component';

describe('ReviewsCardComponent', () => {
  let component: ReviewsCardComponent;
  let fixture: ComponentFixture<ReviewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content based on input', () => {
    component.reviewInfo = sampleReview;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.content')).nativeElement
    ).toBeTruthy();
  });
});
