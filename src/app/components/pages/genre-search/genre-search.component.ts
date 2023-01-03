import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Movie } from 'src/app/models/model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-genre-search',
  templateUrl: './genre-search.component.html',
  styleUrls: ['./genre-search.component.scss']
})
export class GenreSearchComponent implements OnInit {
  listOfMovie: Array<Movie> = [];
  constructor(route: ActivatedRoute, private moviesService: MoviesService) {
    route.params
      .subscribe(
        (val) => {
          const type = val['type'];
          const genreId = val['id'];
          const page = val['page'];
          if (type == 'movies') {
            this.moviesService.getMoviesByGenre('movie', genreId, page);
          }
          else {
            this.moviesService.getMoviesByGenre('tv', genreId, page);

          }

        }
      );
  }



  ngOnInit(): void {
    this.moviesService.movies$.pipe(filter(movie => !!movie)).subscribe({
      next: listOfMovie => {
        this.listOfMovie = listOfMovie
        console.log(this.listOfMovie)
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
