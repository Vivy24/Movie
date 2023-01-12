import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre, Movie, MovieDetail, movieType } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  // landing page list
  trendingWeekMovie$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  nowPlayingMovie$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  popularMovie$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  topRatedMovie$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  upcomingMovie$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);

  movies$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  apiKey: string = environment.HTTP_API_KEY;
  movieDetail$: BehaviorSubject<MovieDetail> = new BehaviorSubject<MovieDetail>({
    genres: [],
    homepage: "",
    country: "",
    status: "",
    tagline: "",
    productions: [],
    streamSection: [],
  });

  constructor(private httpClient: HttpClient
  ) { }


  private getMovie(url: string, variable: any) {
    this.httpClient.get<any>(url, {
    }).subscribe({
      next: data => {
        const formattedMovie: Array<Movie> = data.results.map((movie: any) => {
          const formatMovie: Movie = {
            id: movie.id,
            adult: movie.adult,
            backdropImage: `${environment.HTTP_ORIGINAL_IMAGE}${movie.backdrop_path}`,
            posterImage: `${environment.HTTP_ORIGINAL_IMAGE}${movie.poster_path}`,
            title: movie.original_title,
            overview: movie.overview,
            release_date: movie.release_date,
            languages: movie.original_language,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            popularity: movie.popularity,
            type: movieType.Movie,
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
  public getMoviesByTrending() {
    this.getMovie(`https://api.themoviedb.org/3/trending/all/week?api_key=${this.apiKey}`, this.trendingWeekMovie$);
  }



  public getMoviesByGenre(type: string, genreID: string, page = 1) {
    this.getMovie(`https://api.themoviedb.org/3/discover/${type}?api_key=${this.apiKey}&with_genres=${genreID}&page=${page}`, this.movies$);
  }

  public getMovieDetailByMovie(movieID: string) {
    this.httpClient.get<any>(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.apiKey}&language=en-US`, {
      // 
    }).subscribe({
      next: movieDetail => {
        // movie;
        const formattedMovieDetail = {
          homepage: movieDetail.homepage,
          country: movieDetail.production_countries[0].iso_3166_1,
          status: movieDetail.status,
          tagline: movieDetail.tagline,
          genres: movieDetail.genres,
          productions: movieDetail.production_companies.map((company: any) => {
            return {
              logo_path: `${environment.HTTP_ORIGINAL_IMAGE}${company.logo_path}`,
              name: company.name,
              country: company.country
            }
          })
        };

        this.movieDetail$.next(formattedMovieDetail)

        this.httpClient.get<any>(`https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=${this.apiKey}`, {

        }).subscribe({
          next: subInfo => {

            if (subInfo.result) {

            }
          }
        })
      }
    })
  }

}
