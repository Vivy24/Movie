import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Movie } from 'src/app/models/model';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowService } from 'src/app/services/tvshow.service';
import { sampleMovie } from 'src/mockedData/movie';

@Component({
  selector: 'app-movie-more-list',
  templateUrl: './movie-more-list.component.html',
  styleUrls: ['./movie-more-list.component.scss']
})
export class MovieMoreList implements OnInit {
  sampleMovie: Movie = sampleMovie;
  listOfShowMovie: Array<Movie> = [];
  listOfTvShow: Array<Movie> = [];
  listOfMovie: Array<Movie> = [];
  type?: string;
  genreId: string = "";
  page?: number = 1;
  routerLinkBase: string = ""
  section: string = "";
  selection?: string;
  constructor(route: ActivatedRoute, private moviesService: MoviesService, private tvShowService: TvshowService) {
    this.section = route.snapshot.data['section'];
    route.params
      .subscribe(
        (val) => {
          this.type = val['type'];
          this.genreId = val['id'];
          this.page = val['page'];

          if (this.section == 'genre') {
            if (this.type == 'movies') {
              this.moviesService.getMoviesByGenre(this.genreId, this.page);
            }
            else {
              this.tvShowService.getTvShowByGenre(this.genreId, this.page);
            }
          }
          switch (this.section) {
            case "popular":
              this.type = this.section;
              this.moviesService.getMoviesByTrending(this.page);
              this.tvShowService.getTvshowsByTrending(this.page);
              break;
            case "new":
              this.type = this.section;

              this.moviesService.getMoviesByNowPlaying(this.page);
              this.tvShowService.getTvShowsByOnAir(this.page);
              break;
            case "toprated":
              this.type = this.section;

              this.moviesService.getMovieByTopRated(this.page);
              this.tvShowService.getTvShowByTopRated(this.page);
              break;
          }
        }
      );
  }



  ngOnInit(): void {
    this.listOfShowMovie = this.selection == 'movie' ? this.listOfMovie : this.listOfTvShow;

    this.moviesService.movies$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.listOfShowMovie = listOfMovie

      },
      error: error => {
        console.log(error);
      }
    })

    this.tvShowService.tvShow$.pipe(filter(tvshow => !!tvshow)).subscribe({
      next: listOfTvShow => {
        this.listOfShowMovie = listOfTvShow
      },
      error: error => {
        console.log(error)
      }
    })

    this.moviesService.trendingWeekMovie$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.listOfMovie = listOfMovie;
        this.listOfShowMovie = this.listOfMovie;


      },
      error: error => {
        console.log(error);
      }
    })
    this.moviesService.nowPlayingMovie$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.listOfMovie = listOfMovie;
        this.listOfShowMovie = this.listOfMovie;

      },
      error: error => {
        console.log(error);
      }
    })

    this.moviesService.topRatedMovie$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.listOfMovie = listOfMovie;
        this.listOfShowMovie = this.listOfMovie;
      },
      error: error => {
        console.log(error);
      }
    })



    this.tvShowService.trendingWeekTvshow$.pipe(filter(tvshow => !!tvshow)).subscribe({
      next: listOfTvShow => {
        this.listOfTvShow = listOfTvShow;

      },
      error: error => {
        console.log(error)
      }
    })

    this.tvShowService.onAirTvShow$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.listOfTvShow = listOfMovie;
      },
      error: error => {
        console.log(error);
      }
    })

    this.tvShowService.topRatedTvShow$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.listOfTvShow = listOfMovie;
      },
      error: error => {
        console.log(error);
      }
    })
  }
  onValChange = (value: any) => {
    this.selection = value;
    this.listOfShowMovie = this.selection == 'movie' ? this.listOfMovie : this.listOfTvShow;
  }
}
