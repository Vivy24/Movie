import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cast, Movie, MovieDetail, movieType, Review, Video } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ApiControllerService {
  // landing page movie
  trendingWeekMovie$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  nowPlayingMovie$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  popularMovie$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  topRatedMovie$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  upcomingMovie$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);

  // landing page tvshow
  trendingWeekTvshow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  nowPlayingTvshow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  popularTvshow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  topRatedTvshow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
  upcomingTvshow$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);

  videoList$: BehaviorSubject<Array<Video>> = new BehaviorSubject<Array<Video>>([]);

  apiKey: string = environment.HTTP_API_KEY;

  // single movie
  moviesList$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);
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
  })

  // movie detail 
  movieDetailsCast$: BehaviorSubject<Array<Cast>> = new BehaviorSubject<Array<Cast>>([]);
  movieDetailCrew$: BehaviorSubject<Array<Cast>> = new BehaviorSubject<Array<Cast>>([]);
  movieDetailReviewList$: BehaviorSubject<Array<Review>> = new BehaviorSubject<Array<Review>>([]);
  movieDetailVideoList$: BehaviorSubject<Array<Video>> = new BehaviorSubject<Array<Video>>([]);
  recommendationMovieList$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);

  // status
  movieLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  hasError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  private getMovie(url: string, variable: any, type: string) {
    this.movieLoaded$.next(false);
    this.hasError$.next(false);

    this.httpClient.get<any>(url, {
    }).subscribe({
      next: data => {
        const formattedMovie: Array<Movie> = data.results.map((movie: any) => {
          const formatMovie: Movie = {
            id: movie.id,
            adult: movie.adult,
            backdropImage: `${environment.HTTP_ORIGINAL_IMAGE}${movie.backdrop_path}`,
            posterImage: `${environment.HTTP_ORIGINAL_IMAGE}${movie.poster_path}`,
            title: movie.original_title || movie.original_name,
            overview: movie.overview,
            release_date: movie.release_date,
            languages: movie.original_language,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            popularity: movie.popularity,
            type: type == 'movie' ? movieType.Movie : movieType.Tvshow,
          }
          return formatMovie;
        })
        variable.next(formattedMovie)
        this.movieLoaded$.next(true);
      },
      error: Error => {
        this.hasError$.next(true);
      }
    })
  }
  public getTrendingMovie(page = 1, type: string) {
    type == 'movie' ? this.getMovie(`https://api.themoviedb.org/3/trending/all/week?api_key=${this.apiKey}&page=${page}`, this.trendingWeekMovie$, type) : this.getMovie(`https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&language=en-US&page=${page}`, this.trendingWeekTvshow$, type)
  }

  public getNowPlayingMovie(page = 1, type: string) {
    type == 'movie' ? this.getMovie(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=${page}`, this.nowPlayingMovie$, type) : this.getMovie(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${this.apiKey}&language=en-US&page=${page}`, this.nowPlayingTvshow$, type)
  }

  public getTopRatedMovie(page = 1, type: string) {
    type == 'movie' ? this.getMovie(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=${page}`, this.topRatedMovie$, type) : this.getMovie(`https://api.themoviedb.org/3/tv/top_rated?api_key=${this.apiKey}&language=en-US&page=${page}`, this.topRatedTvshow$, type);
  }

  public getListByGenre(genreID: string, page = 1, type: string) {
    type == 'movie' ? this.getMovie(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&with_genres=${genreID}&page=${page}`, this.moviesList$, type) : this.getMovie(`https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}&with_genres=${genreID}&page=${page}`, this.moviesList$, type)
  }

  public getRecommendationMovieById(movieID: string, type: string) {
    type == 'movie' ? this.getMovie(`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${this.apiKey}&language=en-US&page=1`, this.recommendationMovieList$, type) : this.getMovie(`https://api.themoviedb.org/3/tv/${movieID}/recommendations?api_key=${this.apiKey}&language=en-US&page=1`, this.recommendationMovieList$, type)
  }

  public getMovieDetailByMovie(movieID: string, type: string) {
    this.movieLoaded$.next(false);

    this.httpClient.get<any>(type == 'movie' ? `https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.apiKey}&language=en-US` : `https://api.themoviedb.org/3/tv/${movieID}?api_key=${this.apiKey}&language=en-US`, {}).subscribe({
      next: movieDetail => {
        console.log(movieDetail)
        // movie;
        const formattedMovieDetail = {
          homepage: movieDetail.homepage,
          country: movieDetail.production_countries[0] ? movieDetail.production_countries[0].iso_3166_1.iso_3166_1 : movieDetail.original_country[0],
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
          title: movieDetail.original_title || movieDetail.original_name,
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
        this.movieLoaded$.next(true);

        // provider 
        // this.httpClient.get<any>(`https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=${this.apiKey}`, {

        // }).subscribe({
        //   next: subInfo => {

        //     if (subInfo.result) {

        //     }
        //   }
        // })
      },
      error: Error => {
        this.hasError$.next(true);
      }
    })
  }


  public getMovieCastById(id: string, type: string) {
    this.movieLoaded$.next(false);
    this.httpClient.get<any>(type == 'movie' ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.apiKey}&language=en-US` : `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${this.apiKey}&language=en-US`, {}).subscribe({
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
        this.movieDetailsCast$.next(formattedCastList);
        this.movieLoaded$.next(true);

      },
      error: Error => {
        this.hasError$.next(true);
      }
    })
  }

  public getMovieCrewById(id: string, type: string) {
    this.movieLoaded$.next(false);
    this.httpClient.get<any>(type == 'movie' ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.apiKey}&language=en-US` : `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${this.apiKey}&language=en-US`, {}).subscribe({
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
        this.movieLoaded$.next(true);

      },
      error: Error => {
        this.hasError$.next(true);
      }
    })
  }

  public getMovieReviewById(id: string, type: string) {
    this.movieLoaded$.next(false);
    this.httpClient.get<any>(type == 'movie' ? `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${this.apiKey}&language=en-US&page=1` : `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${this.apiKey}&language=en-US&page=1`, {}).subscribe({
      next: data => {
        const formattedReviewList: Array<Review> = data.results.map((review: any) => {
          const formattedReview: Review = {
            author: review.author,
            authorAvatar: review.author_details.avatar_path ? (review.author_details.avatar_path.includes('http') ? review.author_details.avatar_path.substring(1) : `${environment.HTTP_ORIGINAL_IMAGE}${review.author_details.avatar_path}`) : undefined,
            rating: review.author_details.rating ? review.author_details.rating : undefined,
            content: review.content,
            createdAt: new Date(review.created_at),
            id: review.id,
            url: review.url,

          }
          return formattedReview;
        })
        this.movieDetailReviewList$.next(formattedReviewList)
        this.movieLoaded$.next(true);

      },
      error: Error => {
        this.hasError$.next(true);
      }
    })
  }

  public getVideoById(movieId: string, type: string) {
    this.movieLoaded$.next(false);
    this.httpClient.get<any>(type == 'movie' ? `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.apiKey}&language=en-US` : `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=${this.apiKey}&language=en-US`, {}).subscribe({
      next: data => {
        const formattedVideo: Array<Video> = data.results.map((video: any) => {
          const formattedVideo: Video = {
            id: video.id,
            name: video.name,
            source: video.site == "YouTube" ? `http://www.youtube.com/embed/${video.key}` : undefined,
            type: video.type,
            publishedAt: new Date(video.published_at),
          }
          return formattedVideo;

        })
        this.movieDetailVideoList$.next(formattedVideo);
        this.movieLoaded$.next(true);
      },
      error: Error => {
        this.hasError$.next(true);
      }
    })
  }
}
