import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from 'carousel-angular';

import { SlideshowComponent } from './slideshow.component';

describe('SlideshowComponent', () => {
  let component: SlideshowComponent;
  let fixture: ComponentFixture<SlideshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlideshowComponent, CarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setNumberOfCells function with innerWidth < 349', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(349);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.numberOfCells).toEqual(2);
  });

  it('setNumberOfCells function with innerWidth < 549', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(549);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.numberOfCells).toEqual(3);
  });

  it('setNumberOfCells function with innerWidth < 749*', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(749);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.numberOfCells).toEqual(4);
  });

  it('setNumberOfCells function with innerWidth < 849', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(849);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.numberOfCells).toEqual(5);
  });

  it('onValChange function with movie input', () => {
    component.onValChange('movie');
    fixture.detectChanges();
    expect(component.type).toEqual('movie');
    expect(component.renderMoviesList).toEqual(component.movieList);
  });

  it('onValChange function with tvshow input', () => {
    component.onValChange('tvshow');
    fixture.detectChanges();
    expect(component.type).toEqual('tvshow');
    expect(component.renderMoviesList).toEqual(component.tvShowList);
  });
});
