import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Movie } from 'src/app/models/model';
import { MoviesService } from 'src/app/services/movies.service';
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
  page?: number;
  constructor(route: ActivatedRoute, private moviesService: MoviesService) {
    route.params
      .subscribe(
        (val) => {
          this.type = val['type'];
          this.genreId = val['id'];
          this.page = val['page'];
          if (this.type == 'movies') {
            this.moviesService.getMoviesByGenre(this.genreId, this.page);

          }
          // else {
          //   this.moviesService.getMoviesByGenre(genreId, page);
          // }
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
  }

}
