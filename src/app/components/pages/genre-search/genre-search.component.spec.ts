import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreSearchComponent } from './genre-search.component';

describe('GenreSearchComponent', () => {
  let component: GenreSearchComponent;
  let fixture: ComponentFixture<GenreSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
