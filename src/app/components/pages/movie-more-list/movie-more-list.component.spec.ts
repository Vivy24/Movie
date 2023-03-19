import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { movieType } from 'src/app/models/model';

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

describe('localStorage with Tvshow', () => {
  let component: MovieMoreList;
  let fixture: ComponentFixture<MovieMoreList>;
  let paramsSubject = new BehaviorSubject({
    type: 'tvshow',
  });
  let snapShotData = { data: { section: 'genre' } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatButtonToggleModule,
      ],
      declarations: [MovieMoreList, PaginatorComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject,
            snapshot: snapShotData,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieMoreList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with this.type = tvshow', () => {
    expect(component.type).toEqual('tvshow');
    expect(component).toBeTruthy();
  });
});

describe('localStorage with section popular', () => {
  let component: MovieMoreList;
  let fixture: ComponentFixture<MovieMoreList>;
  let paramsSubject = new BehaviorSubject({
    type: 'tvshow',
  });
  let snapShotData = { data: { section: 'popular' } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatButtonToggleModule,
      ],
      declarations: [MovieMoreList, PaginatorComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject,
            snapshot: snapShotData,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieMoreList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with this.section = popular', () => {
    expect(component.type).toEqual('popular');
    expect(component).toBeTruthy();
  });
});

describe('localStorage with section popular', () => {
  let component: MovieMoreList;
  let fixture: ComponentFixture<MovieMoreList>;
  let paramsSubject = new BehaviorSubject({
    type: 'tvshow',
  });
  let snapShotData = { data: { section: 'new' } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatButtonToggleModule,
      ],
      declarations: [MovieMoreList, PaginatorComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject,
            snapshot: snapShotData,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieMoreList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with this.type = new', () => {
    expect(component.type).toEqual('new');
    expect(component).toBeTruthy();
  });
});

describe('localStorage with section popular', () => {
  let component: MovieMoreList;
  let fixture: ComponentFixture<MovieMoreList>;
  let paramsSubject = new BehaviorSubject({
    type: 'tvshow',
  });
  let snapShotData = { data: { section: 'toprated' } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatButtonToggleModule,
      ],
      declarations: [MovieMoreList, PaginatorComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject,
            snapshot: snapShotData,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieMoreList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with this.type = toprated', () => {
    expect(component.type).toEqual('toprated');
    expect(component).toBeTruthy();
  });
});

describe('MovieMoreList', () => {
  let component: MovieMoreList;
  let fixture: ComponentFixture<MovieMoreList>;
  let paramsSubject = new BehaviorSubject({
    type: 'movies',
  });
  let snapShotData = { data: { section: 'genre' } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatButtonToggleModule,
      ],
      declarations: [MovieMoreList, PaginatorComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject,
            snapshot: snapShotData,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieMoreList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with this.type = movies', () => {
    expect(component.type).toEqual('movies');
    expect(component).toBeTruthy();
  });

  it('should change the type of movie when click the button', () => {
    spyOn(component, 'onValChange').and.callThrough();
    const tvShowBtn = fixture.debugElement.queryAll(
      By.css('mat-button-toggle')
    )[1].nativeElement;
    tvShowBtn.dispatchEvent(new Event('change'));
    expect(component.onValChange).toHaveBeenCalled();
    expect(component.selection).toEqual(movieType.Tvshow);
    expect(component.listOfShowMovie).toEqual(component.listOfTvShow);
  });

  it('should change to different value in onValChange ', () => {
    component.onValChange('movie');
    fixture.detectChanges();
    expect(component.selection).toEqual(movieType.Movie);
    expect(component.listOfShowMovie).toEqual(component.listOfMovie);
  });
});
