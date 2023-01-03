import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movies$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  apiKey: string = environment.HTTP_API_KEY;

  constructor(private httpClient: HttpClient
  ) { }

  public getMoviesByGenre(type: string, genreID: string, page = 1) {
    this.httpClient.get<any>(`https://api.themoviedb.org/3/discover/${type}?api_key=${this.apiKey}&with_genres=${genreID}&page=${page}`, {
    }).subscribe({
      next: data => {

        const formattedMovie: Array<Movie> = data.results.map((movie: any) => {
          const formatMovie: Movie = {
            id: movie.id,
            adult: movie.adult,
            backdropImage: movie.backdrop_path,
            posterImage: movie.poster_path,
            title: movie.original_title,
            overview: movie.overview,
            release_date: movie.release_date,
            languages: movie.original_language,
            genres: movie.genre_ids,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            popularity: movie.popularity
          }
          return formatMovie;
        })

        this.movies$.next(formattedMovie)
        // this.listOfMovieGenres = data.genres as Array<Genre>
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
