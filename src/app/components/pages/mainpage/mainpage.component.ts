import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { Movie, MovieDetail } from 'src/app/models/model';
import { ApiControllerService } from 'src/app/services/api-controller.service';
import { LoadIndicatorService } from 'src/app/services/load-indicator.service';


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
  constructor(public loadIndicatorService: LoadIndicatorService, private apiController: ApiControllerService) { }

  ngOnInit(): void {
    this.apiController.getTopRatedMovie(1, 'movie');
    this.apiController.getNowPlayingMovie(1, 'movie');
    this.apiController.getTrendingMovie(1, 'movie');
    this.apiController.getTopRatedMovie(1, 'tvshow');
    this.apiController.getNowPlayingMovie(1, 'tvshow');
    this.apiController.getTrendingMovie(1, 'tvshow');


    this.apiController.trendingWeekMovie$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.trendingMoviesList = listOfMovie;
        this.trendingMoviesList[0] && this.apiController.getMovieDetailByMovie(`${this.trendingMoviesList[0].id}`, 'movie');
        this.latestMovie = this.trendingMoviesList[0];

      },
      error: error => {
        console.log(error);
      }
    })

    this.apiController.movieDetail$.pipe(filter(movie => !!movie)).subscribe({
      next: movieDetail => {
        this.latestMovieDetail = movieDetail;
      },
      error: error => {
        console.log(error);
      }
    })

    this.apiController.nowPlayingMovie$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.onAirMoviesList = listOfMovie;
      },
      error: error => {
        console.log(error);
      }
    })

    this.apiController.topRatedMovie$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.topRatedMovieList = listOfMovie;
      },
      error: error => {
        console.log(error);
      }
    })



    this.apiController.trendingWeekTvshow$.pipe(filter(tvshow => !!tvshow)).subscribe({
      next: listOfTvShow => {
        this.trendingTvshowsList = listOfTvShow;

      },
      error: error => {
        console.log(error)
      }
    })

    this.apiController.nowPlayingTvshow$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.onAirTvShowsList = listOfMovie;
      },
      error: error => {
        console.log(error);
      }
    })

    this.apiController.topRatedTvshow$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.topRatedTvShowList = listOfMovie;
      },
      error: error => {
        console.log(error);
      }
    })

    // this.loadIndicatorService.criticalError$.pipe(filter(error => !!error)).subscribe({
    //   next: hasError => {
    //     if (hasError) {
    //       this.router.navigateByUrl('/server/error')
    //     }
    //   }
    // })
  }
}

