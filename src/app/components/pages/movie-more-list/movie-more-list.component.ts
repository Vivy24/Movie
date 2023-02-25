import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Movie, movieType } from 'src/app/models/model';
import { ApiControllerService } from 'src/app/services/api-controller.service';

@Component({
  selector: 'app-movie-more-list',
  templateUrl: './movie-more-list.component.html',
  styleUrls: ['./movie-more-list.component.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MovieMoreList implements OnInit {
  listOfShowMovie: Array<Movie> = [];
  listOfTvShow: Array<Movie> = [];
  listOfMovie: Array<Movie> = [];
  type?: string;
  genreId = '';
  page?: number = 1;
  routerLinkBase = '';
  section = '';
  selection?: movieType;
  movieType = movieType;
  constructor(
    route: ActivatedRoute,
    private apiController: ApiControllerService
  ) {
    this.section = route.snapshot.data['section'];
    route.params.subscribe((val) => {
      this.type = val['type'];
      this.genreId = val['id'];
      this.page = val['page'];

      if (this.section === 'genre') {
        if (this.type === 'movies') {
          localStorage.setItem('selectionType', 'movie');
          this.selection =
            localStorage!.getItem('selectionType')! === 'movie'
              ? movieType.Movie
              : movieType.Tvshow;
          this.apiController.getListByGenre(this.genreId, this.page, 'movie');
        } else {
          localStorage.setItem('selectionType', 'tvshow');
          this.selection =
            localStorage!.getItem('selectionType')! === 'movie'
              ? movieType.Movie
              : movieType.Tvshow;
          this.apiController.getListByGenre(this.genreId, this.page, 'tvshow');
        }
      }
      switch (this.section) {
        case 'popular':
          this.type = this.section;
          this.apiController.getTrendingMovie(this.page, 'movie');
          this.apiController.getTrendingMovie(this.page, 'tvshow');
          break;
        case 'new':
          this.type = this.section;

          this.apiController.getNowPlayingMovie(this.page, 'movie');
          this.apiController.getNowPlayingMovie(this.page, 'tvshow');
          break;
        case 'toprated':
          this.type = this.section;

          this.apiController.getTopRatedMovie(this.page, 'movie');
          this.apiController.getTopRatedMovie(this.page, 'tvshow');
          break;
      }

      this.listOfShowMovie =
        this.selection === movieType.Movie
          ? this.listOfMovie
          : this.listOfTvShow;
    });
  }

  ngOnInit(): void {
    this.selection =
      localStorage!.getItem('selectionType')! === 'movie'
        ? movieType.Movie
        : movieType.Tvshow;
    if (!this.selection) {
      localStorage.setItem('selectionType', 'movie');
    }
    this.apiController.moviesList$.pipe(filter((movie) => !!movie)).subscribe({
      next: (listOfMovie) => {
        if (this.type === 'movie') {
          this.listOfShowMovie = listOfMovie;
        } else {
          this.listOfShowMovie = listOfMovie;
        }
      },
      // error: (error) => {
      //   console.log(error);
      // },
    });

    this.apiController.trendingWeekMovie$
      .pipe(filter((movie) => !!movie))
      .subscribe({
        next: (listOfMovie) => {
          this.listOfMovie = listOfMovie;
          this.updateMovies();
        },
        // error: (error) => {
        //   console.log(error);
        // },
      });
    this.apiController.nowPlayingMovie$
      .pipe(filter((movie) => !!movie))
      .subscribe({
        next: (listOfMovie) => {
          this.listOfMovie = listOfMovie;
          this.updateMovies();
        },
        // error: (error) => {
        //   console.log(error);
        // },
      });

    this.apiController.topRatedMovie$
      .pipe(filter((movie) => !!movie))
      .subscribe({
        next: (listOfMovie) => {
          this.listOfMovie = listOfMovie;
          this.updateMovies();
        },
        // error: (error) => {
        //   console.log(error);
        // },
      });

    this.apiController.trendingWeekTvshow$
      .pipe(filter((tvshow) => !!tvshow))
      .subscribe({
        next: (listOfTvShow) => {
          this.listOfTvShow = listOfTvShow;
          this.updateMovies();
        },
        // error: (error) => {
        //   console.log(error);
        // },
      });

    this.apiController.nowPlayingTvshow$
      .pipe(filter((movie) => !!movie))
      .subscribe({
        next: (listOfMovie) => {
          this.listOfTvShow = listOfMovie;
          this.updateMovies();
        },
        // error: (error) => {
        //   console.log(error);
        // },
      });

    this.apiController.topRatedTvshow$
      .pipe(filter((movie) => !!movie))
      .subscribe({
        next: (listOfMovie) => {
          this.listOfTvShow = listOfMovie;
          this.updateMovies();
        },
        // error: (error) => {
        //   console.log(error);
        // },
      });
  }
  onValChange = (value: string) => {
    localStorage.setItem('selectionType', value);
    this.selection = value === 'movie' ? movieType.Movie : movieType.Tvshow;
    this.listOfShowMovie =
      this.selection === movieType.Movie ? this.listOfMovie : this.listOfTvShow;
  };

  updateMovies = () => {
    this.listOfShowMovie =
      this.selection === movieType.Movie ? this.listOfMovie : this.listOfTvShow;
  };
}
