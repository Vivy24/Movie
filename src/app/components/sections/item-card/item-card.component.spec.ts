import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sampleMovie } from 'src/mockedData/movie';

import { ItemCardComponent } from './item-card.component';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render content based on component', () => {
    component.movie = sampleMovie;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.content h3')).nativeElement
        .textContent
    ).toEqual(sampleMovie.title);
    expect(
      fixture.debugElement.query(By.css('.content p')).nativeElement.textContent
    ).toEqual(`View: ${sampleMovie.popularity}`);
  });
});
