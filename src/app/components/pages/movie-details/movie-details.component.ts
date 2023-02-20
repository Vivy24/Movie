import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Cast, Movie, MovieDetail, Review, Video } from 'src/app/models/model';
import { ApiControllerService } from 'src/app/services/api-controller.service';
import { LoadIndicatorService } from 'src/app/services/load-indicator.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  type?: string = "";
  movieId: string = ""
  movie?: Movie;
  movieDetail?: MovieDetail;
  castList?: Array<Cast>;
  reviewList?: Array<Review>;
  movieRecommendationList?: Array<Movie>;
  movieVideoList?: Array<Video>;
  trailer?: Video;
  firstVideo?: Video;
  constructor(route: ActivatedRoute, private apiController: ApiControllerService, public loadIndicatorService: LoadIndicatorService, private router: Router) {
    route.params
      .subscribe(
        (val) => {
          this.type = val["type"];
          this.movieId = val["id"]

          if (this.type == 'movie') {
            this.apiController.getMovieDetailByMovie(this.movieId, 'movie');
            this.apiController.getMovieCastById(this.movieId, 'movie');
            this.apiController.getMovieReviewById(this.movieId, 'movie');
            this.apiController.getRecommendationMovieById(this.movieId, 'movie');
            this.apiController.getMovieTrailerById(this.movieId, 'movie')
          }
          else {
            this.apiController.getMovieDetailByMovie(this.movieId, 'tvshow');
            this.apiController.getMovieCastById(this.movieId, 'tvshow');
            this.apiController.getMovieReviewById(this.movieId, 'tvshow');
            this.apiController.getRecommendationMovieById(this.movieId, 'tvshow');
            this.apiController.getMovieTrailerById(this.movieId, 'tvshow')

          }
        }
      );
  }
  ngOnInit(): void {
    this.apiController.movieSingle$.pipe(filter(movie => !!movie)).subscribe({
      next: movie => {
        this.movie = movie;

      },
      error: error => {
        console.log(error);
      }
    })

    this.apiController.movieDetail$.pipe(filter(movie => !!movie)).subscribe({
      next: movieDetail => {
        this.movieDetail = movieDetail;

      },
      error: error => {
        console.log(error);
      }
    })

    this.apiController.movieDetailsCast$.pipe(filter(cast => !!cast)).subscribe({
      next: listOfCast => {
        this.castList = listOfCast;
      },
      error: error => {
        console.log(error)
      }
    })

    this.apiController.movieDetailReviewList$.pipe(filter(review => !!review)).subscribe({
      next: reviewList => {
        this.reviewList = reviewList;
      },
      error: error => {
        console.log(error)
      }
    })

    this.apiController.recommendationMovieList$.pipe(filter(movie => !!movie)).subscribe({
      next: movieList => {
        this.movieRecommendationList = movieList;
      },
      error: error => {
        console.log(error)
      }
    })

    this.apiController.movieDetailVideoList$.pipe(filter(video => !!video)).subscribe({
      next: videoList => {
        this.movieVideoList = videoList;
        console.log(this.movieVideoList);
        this.trailer = videoList.find((video) => {
          return video.type == "Trailer"
        })
        this.firstVideo = this.movieVideoList[0];
      },
      error: error => {
        console.log(error)
      }
    })

  }
}
