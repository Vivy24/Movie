import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cast, Movie, MovieDetail, movieType } from '../models/model';

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

  movieSingle$: BehaviorSubject<Movie> = new BehaviorSubject<Movie>({
    id: 0,
    adult: false,
    backdropImage: "",
    posterImage: "",
    title: "",
    overview: "",
    release_date: "",
    languages: "",
    vote_average: 0,
    vote_count: 0,
    popularity: 0,
    type: movieType.Movie
  })

  movieDetailsCast$: BehaviorSubject<Array<Cast>> = new BehaviorSubject<Array<Cast>>([]);
  movieDetailCrew$: BehaviorSubject<Array<Cast>> = new BehaviorSubject<Array<Cast>>([]);

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
  public getMoviesByTrending(page = 1) {
    this.getMovie(`https://api.themoviedb.org/3/trending/all/week?api_key=${this.apiKey}&page=${page}`, this.trendingWeekMovie$);
  }

  public getMoviesByNowPlaying(page = 1) {
    this.getMovie(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=${page}`, this.nowPlayingMovie$);
  }

  public getMovieByTopRated(page = 1) {
    this.getMovie(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=${page}`, this.topRatedMovie$);
  }

  public getMoviesByGenre(genreID: string, page = 1) {
    this.getMovie(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&with_genres=${genreID}&page=${page}`, this.movies$);
  }

  public getMovieDetailByMovie(movieID: string) {
    this.httpClient.get<any>(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.apiKey}&language=en-US`, {}).subscribe({
      next: movieDetail => {
        console.log(movieDetail)
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

        const formattedMovie = {
          id: movieDetail.id,
          adult: movieDetail.adult,
          backdropImage: movieDetail.belongs_to_collection != null ? `${environment.HTTP_ORIGINAL_IMAGE}${movieDetail.belongs_to_collection.backdrop_path}` : `${environment.HTTP_ORIGINAL_IMAGE}${movieDetail.backdrop_path}`,
          posterImage: movieDetail.belongs_to_collection != null ? `${environment.HTTP_ORIGINAL_IMAGE}${movieDetail.belongs_to_collection.poster_path}` : `${environment.HTTP_ORIGINAL_IMAGE}${movieDetail.poster_path}`,
          title: movieDetail.original_title,
          overview: movieDetail.overview,
          release_date: movieDetail.release_date,
          languages: movieDetail.original_language,
          vote_average: movieDetail.vote_average,
          vote_count: movieDetail.vote_count,
          popularity: movieDetail.popularity,
          type: movieType.Movie,
        }

        this.movieDetail$.next(formattedMovieDetail)
        this.movieSingle$.next(formattedMovie)

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


  public getMovieCastById(id: string) {
    this.httpClient.get<any>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.apiKey}&language=en-US`, {}).subscribe({
      next: castList => {
        const formattedCastList: Array<Cast> = castList.cast.map((cast: any) => {
          const formattedCast: Cast = {
            profilePath: `${environment.HTTP_ORIGINAL_IMAGE}${cast.profile_path}`,
            character: cast.character,
            department: cast.known_for_department,
            name: cast.name,
            id: cast.id,
          }
          return formattedCast;
        })
        this.movieDetailsCast$.next(formattedCastList)
      }
    })
  }

  public getMovieCrewById(id: string) {
    this.httpClient.get<any>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.apiKey}&language=en-US`, {}).subscribe({
      next: castList => {

        const formattedCrewList: Array<Cast> = castList.crew.map((cast: any) => {
          const formattedCrew: Cast = {
            profilePath: `${environment.HTTP_ORIGINAL_IMAGE}${cast.profile_path}`,
            character: cast.character,
            department: cast.known_for_department,
            name: cast.name,
            id: cast.id,
          }
          return formattedCrew;
        })
        this.movieDetailCrew$.next(formattedCrewList)
      }
    })
  }
}
