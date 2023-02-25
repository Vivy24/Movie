import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Cast, Movie, MovieDetail, Review, Video } from 'src/app/models/model';
import { ApiControllerService } from 'src/app/services/api-controller.service';
import { LoadIndicatorService } from 'src/app/services/load-indicator.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  type?: string = '';
  movieId = '';
  movie?: Movie;
  movieDetail?: MovieDetail;
  castList?: Array<Cast>;
  reviewList?: Array<Review>;
  movieRecommendationList?: Array<Movie>;
  movieVideoList?: Array<Video>;
  trailer?: Video;
  firstVideo?: Video;
  constructor(
    route: ActivatedRoute,
    private apiController: ApiControllerService,
    public loadIndicatorService: LoadIndicatorService
  ) {
    route.params.subscribe((val) => {
      this.type = val['type'].toLowerCase();
      this.movieId = val['id'];
      this.apiController.getMovieDetailByMovie(this.movieId, this.type!);
      this.apiController.getMovieCastById(this.movieId, this.type!);
      this.apiController.getMovieReviewById(this.movieId, this.type!);
      this.apiController.getRecommendationMovieById(this.movieId, this.type!);
      this.apiController.getVideoById(this.movieId, this.type!);
    });
  }
  ngOnInit(): void {
    this.apiController.movieSingle$.pipe(filter((movie) => !!movie)).subscribe({
      next: (movie) => {
        this.movie = movie;
      },
      // error: (error) => {},
    });

    this.apiController.movieDetail$.pipe(filter((movie) => !!movie)).subscribe({
      next: (movieDetail) => {
        this.movieDetail = movieDetail;
      },
      // error: (error) => {},
    });

    this.apiController.movieDetailsCast$
      .pipe(filter((cast) => !!cast))
      .subscribe({
        next: (listOfCast) => {
          this.castList = listOfCast;
        },
        // error: (error) => {},
      });

    this.apiController.movieDetailReviewList$
      .pipe(filter((review) => !!review))
      .subscribe({
        next: (reviewList) => {
          this.reviewList = reviewList;
        },
        // error: (error) => {},
      });

    this.apiController.recommendationMovieList$
      .pipe(filter((movie) => !!movie))
      .subscribe({
        next: (movieList) => {
          this.movieRecommendationList = movieList;
        },
        // error: (error) => {},
      });

    this.apiController.movieDetailVideoList$
      .pipe(filter((video) => !!video))
      .subscribe({
        next: (videoList) => {
          this.movieVideoList = videoList;
          // console.log(this.movieVideoList);
          this.trailer = videoList.find((video) => {
            return video.type === 'Trailer';
          });
          this.firstVideo = this.movieVideoList[0];
        },
        // error: (error) => {},
      });
  }
}
