import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cast, Movie, MovieDetail, movieType } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class TvshowService {
  trendingWeekTvshow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  onAirTvShow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  topRatedTvShow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  apiKey: string = environment.HTTP_API_KEY;
  tvShow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  tvShowDetails$: BehaviorSubject<MovieDetail> = new BehaviorSubject<MovieDetail>({
    genres: [],
    homepage: "",
    country: "",
    status: "",
    tagline: "",
    productions: [],
    streamSection: [],
  });
  tvShowSingle$: BehaviorSubject<Movie> = new BehaviorSubject<Movie>({
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
    type: movieType.Tvshow
  })

  tvShowCasts$: BehaviorSubject<Array<Cast>> = new BehaviorSubject<Array<Cast>>([]);
  tvShowCrews$: BehaviorSubject<Array<Cast>> = new BehaviorSubject<Array<Cast>>([]);
  tvShowLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(private httpClient: HttpClient) { }
  private getTvshow(url: string, variable: any) {
    this.tvShowLoaded$.next(false);
    this.httpClient.get<any>(url, {
    }).subscribe({
      next: data => {
        const formattedMovie: Array<Movie> = data.results.map((movie: any) => {
          const formatMovie: Movie = {
            id: movie.id,
            adult: false,
            backdropImage: "",
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

        variable.next(formattedMovie);
        this.tvShowLoaded$.next(true);

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

  public getTvShowDetails(id: string) {
    this.tvShowLoaded$.next(false);
    this.httpClient.get<any>(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=en-US`, {
    }).subscribe({
      next: movieDetail => {
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


        this.tvShowDetails$.next(formattedMovieDetail)
        this.tvShowSingle$.next(formattedMovie)
        this.tvShowLoaded$.next(true);

        // get provider 
        // this.httpClient.get<any>(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${this.apiKey}`, {

        // }).subscribe({
        //   next: subInfo => {

        //     if (subInfo.result) {

        //     }
        //   }
        // })
      }


    })
  }

  public getTvShowCastById(id: string) {
    this.tvShowLoaded$.next(false);
    this.httpClient.get<any>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${this.apiKey}&language=en-US`, {}).subscribe({
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
        console.log(formattedCastList)
        this.tvShowCasts$.next(formattedCastList);
        this.tvShowLoaded$.next(true);
      }
    })
  }

  public getTvShowCrewById(id: string) {
    this.tvShowLoaded$.next(false);
    this.httpClient.get<any>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${this.apiKey}&language=en-US`, {}).subscribe({
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
        this.tvShowCrews$.next(formattedCrewList);
        this.tvShowLoaded$.next(true);
      }
    })
  }
}
