import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieMoreList } from './movie-more-list.component';

describe('MovieMoreList', () => {
  let component: MovieMoreList;
  let fixture: ComponentFixture<MovieMoreList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieMoreList],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieMoreList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
