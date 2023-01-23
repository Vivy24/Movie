import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, movieType } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class TvshowService {
  trendingWeekTvshow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  onAirTvShow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  topRatedTvShow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  apiKey: string = environment.HTTP_API_KEY;
  tvShow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);

  constructor(private httpClient: HttpClient) { }
  private getTvshow(url: string, variable: any) {
    this.httpClient.get<any>(url, {
    }).subscribe({
      next: data => {
        const formattedMovie: Array<Movie> = data.results.map((movie: any) => {
          const formatMovie: Movie = {
            id: movie.id,
            adult: false,
            backdropImage: `${environment.HTTP_ORIGINAL_IMAGE}${movie.backdrop_path}`,
            posterImage: `${environment.HTTP_ORIGINAL_IMAGE}${movie.poster_path}`,
            title: movie.original_name,
            overview: movie.overview,
            release_date: movie.first_air_date,
            languages: movie.original_language,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            popularity: movie.popularity,
            type: movieType.Tvshow,
          }
          return formatMovie;
        })

        variable.next(formattedMovie)
      },
      error: error => {
        console.log(error);
      }
    })
  }

  public getTvshowsByTrending(page = 1) {
    this.getTvshow(`https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&language=en-US&page=${page}`, this.trendingWeekTvshow$)
  }

  public getTvShowsByOnAir(page = 1) {
    this.getTvshow(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${this.apiKey}&language=en-US&page=${page}`, this.onAirTvShow$)
  }

  public getTvShowByTopRated(page = 1) {
    this.getTvshow(`https://api.themoviedb.org/3/tv/top_rated?api_key=${this.apiKey}&language=en-US&page=${page}`, this.topRatedTvShow$)
  }

  public getTvShowByGenre(genreID: string, page = 1) {
    this.getTvshow(`https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}&with_genres=${genreID}&page=${page}`, this.tvShow$);
  }
}
