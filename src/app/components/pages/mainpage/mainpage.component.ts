import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { Movie, MovieDetail } from 'src/app/models/model';
import { LoadIndicatorService } from 'src/app/services/load-indicator.service';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowService } from 'src/app/services/tvshow.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  trendingMoviesList: Array<Movie> = [];
  trendingTvshowsList: Array<Movie> = [];
  onAirMoviesList: Array<Movie> = [];
  onAirTvShowsList: Array<Movie> = [];
  topRatedMovieList: Array<Movie> = [];
  topRatedTvShowList: Array<Movie> = [];
  latestMovie: Movie | undefined;
  latestMovieDetail: MovieDetail | undefined;
  constructor(private moviesService: MoviesService, private tvshowService: TvshowService, public loadIndicatorService: LoadIndicatorService) { }

  ngOnInit(): void {
    this.moviesService.getMoviesByTrending();
    this.tvshowService.getTvshowsByTrending();
    this.moviesService.getMoviesByNowPlaying();
    this.tvshowService.getTvShowsByOnAir();
    this.moviesService.getMovieByTopRated();
    this.tvshowService.getTvShowByTopRated();

    this.moviesService.trendingWeekMovie$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.trendingMoviesList = listOfMovie;
        this.trendingMoviesList[0] && this.moviesService.getMovieDetailByMovie(`${this.trendingMoviesList[0].id}`);
        this.latestMovie = this.trendingMoviesList[0];

      },
      error: error => {
        console.log(error);
      }
    })

    this.moviesService.movieDetail$.pipe(filter(movie => !!movie)).subscribe({
      next: movieDetail => {
        this.latestMovieDetail = movieDetail;
      },
      error: error => {
        console.log(error);
      }
    })

    this.moviesService.nowPlayingMovie$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.onAirMoviesList = listOfMovie;
      },
      error: error => {
        console.log(error);
      }
    })

    this.moviesService.topRatedMovie$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.topRatedMovieList = listOfMovie;
      },
      error: error => {
        console.log(error);
      }
    })



    this.tvshowService.trendingWeekTvshow$.pipe(filter(tvshow => !!tvshow)).subscribe({
      next: listOfTvShow => {
        this.trendingTvshowsList = listOfTvShow;

      },
      error: error => {
        console.log(error)
      }
    })

    this.tvshowService.onAirTvShow$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.onAirTvShowsList = listOfMovie;
      },
      error: error => {
        console.log(error);
      }
    })

    this.tvshowService.topRatedTvShow$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.topRatedTvShowList = listOfMovie;
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
