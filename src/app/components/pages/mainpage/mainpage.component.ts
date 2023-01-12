import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { Movie, MovieDetail } from 'src/app/models/model';
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
  latestMovie: Movie | undefined;
  latestMovieDetail: MovieDetail | undefined;
  constructor(private moviesService: MoviesService, private tvshowService: TvshowService) { }

  ngOnInit(): void {
    this.moviesService.getMoviesByTrending();
    this.moviesService.trendingWeekMovie$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.trendingMoviesList = listOfMovie;
        this.latestMovie = this.trendingMoviesList[0];
        this.latestMovie && this.moviesService.getMovieDetailByMovie(`${this.latestMovie.id}`);

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

    this.tvshowService.getTvshowsByTrending();
    this.tvshowService.trendingWeekTvshow$.pipe(filter(tvshow => !!tvshow)).subscribe({
      next: listOfTvShow => {
        this.trendingTvshowsList = listOfTvShow;
        console.log(this.trendingTvshowsList)

      },
      error: error => {
        console.log(error)
      }
    })
  }

}
