import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Cast, Movie, MovieDetail, Review } from 'src/app/models/model';
import { LoadIndicatorService } from 'src/app/services/load-indicator.service';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowService } from 'src/app/services/tvshow.service';

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
  constructor(route: ActivatedRoute, private tvService: TvshowService, private movieService: MoviesService, public loadIndicatorService: LoadIndicatorService) {
    route.params
      .subscribe(
        (val) => {
          this.type = val["type"];
          this.movieId = val["id"]

          if (this.type == 'movie') {
            this.movieService.getMovieDetailByMovie(this.movieId);
            this.movieService.getMovieCastById(this.movieId);
            this.movieService.getMovieReviewById(this.movieId);
            this.movieService.getRecommendationMovieById(this.movieId);
          }
          else {
            this.tvService.getTvShowDetails(this.movieId);
            this.tvService.getTvShowCastById(this.movieId);
            this.tvService.getTvshowReviewById(this.movieId);
            this.tvService.getRecommendationTvshowById(this.movieId);

          }
        }
      );
  }
  ngOnInit(): void {
    this.movieService.movieSingle$.pipe(filter(movie => !!movie)).subscribe({
      next: movie => {
        this.movie = movie;

      },
      error: error => {
        console.log(error);
      }
    })

    this.movieService.movieDetail$.pipe(filter(movie => !!movie)).subscribe({
      next: movieDetail => {
        this.movieDetail = movieDetail;

      },
      error: error => {
        console.log(error);
      }
    })

    this.movieService.movieDetailsCast$.pipe(filter(cast => !!cast)).subscribe({
      next: listOfCast => {
        this.castList = listOfCast;
      },
      error: error => {
        console.log(error)
      }
    })

    this.movieService.movieDetailReviewList$.pipe(filter(review => !!review)).subscribe({
      next: reviewList => {
        this.reviewList = reviewList;
      },
      error: error => {
        console.log(error)
      }
    })

    this.movieService.recommendationMovie$.pipe(filter(movie => !!movie)).subscribe({
      next: movieList => {
        console.log(movieList)
        this.movieRecommendationList = movieList;
      },
      error: error => {
        console.log(error)
      }
    })

    this.tvService.tvShowSingle$.pipe(filter(movie => !!movie)).subscribe({
      next: movie => {
        console.log(movie)
        this.movie = movie;

      },
      error: error => {
        console.log(error);
      }
    })

    this.tvService.tvShowDetails$.pipe(filter(movie => !!movie)).subscribe({
      next: movieDetail => {
        this.movieDetail = movieDetail;

      },
      error: error => {
        console.log(error);
      }
    })

    this.tvService.tvShowCasts$.pipe(filter(cast => !!cast)).subscribe({
      next: listOfCast => {
        this.castList = listOfCast;
      },
      error: error => {
        console.log(error)
      }
    })

    this.tvService.tvShowReview$.pipe(filter(review => !!review)).subscribe({
      next: reviewList => {
        this.reviewList = reviewList;
      },
      error: error => {
        console.log(error)
      }
    })

    this.tvService.recommendationTvshow$.pipe(filter(tvshow => !!tvshow)).subscribe({
      next: tvshow => {
        this.movieRecommendationList = tvshow;
      },
      error: error => {
        console.log(error)
      }
    })


  }


}
