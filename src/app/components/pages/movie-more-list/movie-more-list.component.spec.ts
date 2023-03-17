import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterTestingModule } from '@angular/router/testing';

import { MovieMoreList } from './movie-more-list.component';

@Component({
  selector: 'app-paginator',
  template: '',
})
class PaginatorComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 300;
  @Input() windowSize = 5;
  @Input() type?: string;
  @Input() genreId?: string;
  @Input() showFirstLastButton = true;
  @Input() routerLinkBase: string = this.genreId ? 'genres' : '';
}

describe('MovieMoreList', () => {
  let component: MovieMoreList;
  let fixture: ComponentFixture<MovieMoreList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, MatButtonToggleModule],
      declarations: [MovieMoreList, PaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieMoreList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
