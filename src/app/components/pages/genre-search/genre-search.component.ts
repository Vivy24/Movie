import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Movie } from 'src/app/models/model';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowService } from 'src/app/services/tvshow.service';
import { sampleMovie } from 'src/mockedData/movie';

@Component({
  selector: 'app-genre-search',
  templateUrl: './genre-search.component.html',
  styleUrls: ['./genre-search.component.scss']
})
export class GenreSearchComponent implements OnInit {
  sampleMovie: Movie = sampleMovie;
  listOfMovie: Array<Movie> = [];
  type?: string;
  genreId: string = "";
  page?: number = 1;
  routerLinkBase: string = ""
  constructor(route: ActivatedRoute, private moviesService: MoviesService, private tvShowService: TvshowService) {
    route.params
      .subscribe(
        (val) => {
          this.type = val['type'];
          this.genreId = val['id'];
          this.page = val['page'];
          if (this.type == 'movies') {
            this.moviesService.getMoviesByGenre(this.genreId, this.page);

          }
          else {
            this.tvShowService.getTvShowByGenre(this.genreId, this.page);
          }
        }
      );
  }



  ngOnInit(): void {
    this.moviesService.movies$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.listOfMovie = listOfMovie
      },
      error: error => {
        console.log(error);
      }
    })

    this.tvShowService.tvShow$.pipe(filter(tvshow => !!tvshow)).subscribe({
      next: listOfTvShow => {
        console.log(listOfTvShow)
        this.listOfMovie = listOfTvShow
      },
      error: error => {
        console.log(error)
      }
    })
  }

}
