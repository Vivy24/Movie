import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Cast, Movie, MovieDetail } from 'src/app/models/model';
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
  constructor(route: ActivatedRoute, private tvService: TvshowService, private movieService: MoviesService) {
    route.params
      .subscribe(
        (val) => {
          this.type = val["type"];
          this.movieId = val["id"]

          if (this.type == 'movie') {
            console.log("Get Movie Detail")
            this.movieService.getMovieDetailByMovie(this.movieId);
            this.movieService.getMovieCastById(this.movieId)
          }
          else {
            console.log("Get TvShow Detail")
            this.tvService.getTvShowDetails(this.movieId);
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
      next: listOfCAst => {
        this.castList = listOfCAst;
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


  }


}
