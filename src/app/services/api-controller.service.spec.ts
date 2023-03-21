import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { throwError, of } from 'rxjs';
import {
  castListFromAPI,
  movieDetailFromApi,
  movieInfoFromAPI,
  movieInfoFromAPIWithoutImage,
  reviewListFromAPI,
  sampleMovie,
  sampleMovieDetail,
  sampleVideoFromAPI,
  tvshowDetailFromApi,
} from 'src/mockedData/movie';
import {
  Cast,
  Genre,
  Movie,
  MovieDetail,
  movieType,
  Review,
  Video,
} from '../models/model';

import { ApiControllerService } from './api-controller.service';

describe('ApiControllerService', () => {
  let service: ApiControllerService;
  let http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiControllerService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getMovie function with movie type without backdrop image and poster path', () => {
    spyOn(http, 'get').and.returnValue(
      of({ results: [movieInfoFromAPIWithoutImage] })
    );
    spyOn(service.trendingWeekMovie$, 'next');
    spyOn(service.movieLoaded$, 'next');
    const result = {
      id: movieInfoFromAPIWithoutImage.id,
      backdropImage: undefined,
      posterImage: undefined,
      title: movieInfoFromAPIWithoutImage.original_name,
      overview: movieInfoFromAPIWithoutImage.overview,
      languages: movieInfoFromAPIWithoutImage.original_language,
      vote_average: movieInfoFromAPIWithoutImage.vote_average,
      vote_count: movieInfoFromAPIWithoutImage.vote_count,
      popularity: movieInfoFromAPIWithoutImage.popularity,
      type: movieType.Movie,
      adult: undefined,
      release_date: undefined,
    };
    service.getMovie('exampleURL', service.trendingWeekMovie$, 'movie');
    expect(service.trendingWeekMovie$.next).toHaveBeenCalledWith([
      result as unknown as Movie,
    ]);
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getMovie function with tvshow type', () => {
    spyOn(http, 'get').and.returnValue(of({ results: [movieInfoFromAPI] }));
    spyOn(service.trendingWeekMovie$, 'next');
    spyOn(service.movieLoaded$, 'next');
    const result = {
      id: movieInfoFromAPIWithoutImage.id,
      backdropImage:
        'https://image.tmdb.org/t/p/original/gQxaF79LUTtopdYHsuS8lUr9rvF.jpg',
      posterImage:
        'https://image.tmdb.org/t/p/original/86OUOPulMiM8rjrQSt4KMev7UAa.jpg',
      title: movieInfoFromAPIWithoutImage.original_name,
      overview: movieInfoFromAPIWithoutImage.overview,
      languages: movieInfoFromAPIWithoutImage.original_language,
      vote_average: movieInfoFromAPIWithoutImage.vote_average,
      vote_count: movieInfoFromAPIWithoutImage.vote_count,
      popularity: movieInfoFromAPIWithoutImage.popularity,
      type: movieType.Tvshow,
      adult: undefined,
      release_date: undefined,
    };
    service.getMovie('exampleURL', service.trendingWeekMovie$, 'tvshow');
    expect(service.trendingWeekMovie$.next).toHaveBeenCalledWith([
      result as unknown as Movie,
    ]);
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getMovie function throw error', () => {
    spyOn(http, 'get').and.returnValue(throwError({ status: 404 }));
    spyOn(service.hasError$, 'next');
    service.getMovie('exampleURL', service.trendingWeekMovie$, 'tvshow');
    expect(service.hasError$.next).toHaveBeenCalledWith(true);
  });

  it('getTrendingMovie function call getMovie with matching type', () => {
    spyOn(service, 'getMovie');
    service.getTrendingMovie(1, 'movie');
    expect(service.getMovie).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${service.apiKey}&page=1`,
      service.trendingWeekMovie$,
      'movie'
    );

    service.getTrendingMovie(1, 'tv');
    expect(service.getMovie).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/tv/popular?api_key=${service.apiKey}&language=en-US&page=1`,
      service.trendingWeekMovie$,
      'tv'
    );
  });

  it('getNowPlayingMovie function call getMovie with matching type', () => {
    spyOn(service, 'getMovie');
    service.getNowPlayingMovie(1, 'movie');
    expect(service.getMovie).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${service.apiKey}&language=en-US&page=1`,
      service.nowPlayingMovie$,
      'movie'
    );

    service.getNowPlayingMovie(1, 'tv');
    expect(service.getMovie).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${service.apiKey}&language=en-US&page=1`,
      service.nowPlayingMovie$,
      'tv'
    );
  });

  it('getTopRatedMovie function call getMovie with matching type', () => {
    spyOn(service, 'getMovie');
    service.getTopRatedMovie(1, 'movie');
    expect(service.getMovie).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${service.apiKey}&language=en-US&page=1`,
      service.nowPlayingMovie$,
      'movie'
    );

    service.getTopRatedMovie(1, 'tv');
    expect(service.getMovie).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${service.apiKey}&language=en-US&page=1`,
      service.nowPlayingMovie$,
      'tv'
    );
  });

  it('getListByGenre function call getMovie with matching type', () => {
    spyOn(service, 'getMovie');
    service.getListByGenre('12133', 1, 'movie');
    expect(service.getMovie).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/discover/movie?api_key=${service.apiKey}&with_genres=12133&page=1`,
      service.recommendationMovieList$,
      'movie'
    );

    service.getListByGenre('12133', 1, 'tv');
    expect(service.getMovie).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/discover/tv?api_key=${service.apiKey}&with_genres=12133&page=1`,
      service.recommendationMovieList$,
      'tv'
    );
  });

  it('getRecommendationMovieById function call getMovie with matching type', () => {
    spyOn(service, 'getMovie');
    service.getRecommendationMovieById('12133', 'movie');
    expect(service.getMovie).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/movie/12133/recommendations?api_key=${service.apiKey}&language=en-US&page=1`,
      service.recommendationMovieList$,
      'movie'
    );

    service.getRecommendationMovieById('12133', 'tv');
    expect(service.getMovie).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/tv/12133/recommendations?api_key=${service.apiKey}&language=en-US&page=1`,
      service.recommendationMovieList$,
      'tv'
    );
  });

  it('getMovieDetailByMovie function with movie type and do not have belong to collection', () => {
    spyOn(http, 'get').and.returnValue(of(movieDetailFromApi));
    spyOn(service.movieDetail$, 'next');
    spyOn(service.movieSingle$, 'next');
    spyOn(service.movieLoaded$, 'next');
    service.getMovieDetailByMovie('1234', 'movie');
    expect(service.movieDetail$.next).toHaveBeenCalledWith({
      homepage: '',
      country: 'ES',
      status: 'Released',
      tagline: 'Fantasy...beyond your imagination',
      genres: [
        Object({ id: 12, name: 'Adventure' }),
        Object({ id: 16, name: 'Animation' }),
        Object({ id: 14, name: 'Fantasy' }),
      ],
      productions: [
        Object({
          logo_path: 'https://image.tmdb.org/t/p/originalnull',
          name: 'Fantasy Films',
          country: undefined,
        }),
        Object({
          logo_path: 'https://image.tmdb.org/t/p/originalnull',
          name: 'Bakshi Productions',
          country: undefined,
        }),
        Object({
          logo_path: 'https://image.tmdb.org/t/p/originalnull',
          name: 'Saul Zaentz Film Productions',
          country: undefined,
        }),
      ],
    } as unknown as MovieDetail);
    expect(service.movieSingle$.next).toHaveBeenCalledWith({
      id: 123,
      adult: false,
      backdropImage:
        'https://image.tmdb.org/t/p/original/x9McE1WFKnAHludiY7xfd7modDC.jpg',
      posterImage:
        'https://image.tmdb.org/t/p/original/liW0mjvTyLs7UCumaHhx3PpU4VT.jpg',
      title: 'The Lord of the Rings',
      overview:
        "The Fellowship of the Ring embark on a journey to destroy the One Ring and end Sauron's reign over Middle-earth.",
      release_date: '1978-11-15',
      languages: 'en',
      vote_average: 6.575,
      vote_count: 710,
      popularity: 26.485,
      type: 0,
    } as unknown as Movie);
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getMovieDetailByMovie function with tv type and have belong to collection', () => {
    spyOn(http, 'get').and.returnValue(of(tvshowDetailFromApi));
    spyOn(service.movieDetail$, 'next');
    spyOn(service.movieSingle$, 'next');
    spyOn(service.movieLoaded$, 'next');
    service.getMovieDetailByMovie('1456', 'tv');
    expect(service.movieDetail$.next).toHaveBeenCalledWith({
      homepage: 'https://www.bbc.co.uk/programmes/p011fgk5',
      country: 'Unknown',
      status: 'Ended',
      tagline: '',
      genres: [
        Object({ id: 16, name: 'Animation' }),
        Object({ id: 35, name: 'Comedy' }),
      ],
      productions: [
        Object({
          logo_path: 'https://image.tmdb.org/t/p/originalnull',
          name: 'Baby Cow Animation',
          country: undefined,
        }),
      ],
    } as unknown as MovieDetail);
    expect(service.movieSingle$.next).toHaveBeenCalledWith({
      id: 100,
      adult: false,
      backdropImage: 'https://image.tmdb.org/t/p/original',
      posterImage: 'https://image.tmdb.org/t/p/original',
      title: 'I Am Not an Animal',
      overview:
        'I Am Not An Animal is an animated comedy series about the only six talking animals in the world, whose cosseted existence in a vivisection unit is turned upside down when they are liberated by animal rights activists.',
      release_date: undefined,
      languages: 'en',
      vote_average: 8.648,
      vote_count: 769,
      popularity: 9.703,
      type: 0,
    } as unknown as Movie);
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getMovieDetailByMovie function throw error', () => {
    spyOn(http, 'get').and.returnValue(throwError({ status: 404 }));
    spyOn(service.hasError$, 'next');
    service.getMovieDetailByMovie('1456', 'tv');
    expect(service.hasError$.next).toHaveBeenCalledWith(true);
  });

  it('getMovieCastById function with movie type', () => {
    spyOn(http, 'get').and.returnValue(of(castListFromAPI));
    spyOn(service.movieDetailsCast$, 'next');
    spyOn(service.movieLoaded$, 'next');
    service.getMovieCastById('1234', 'movie');
    expect(service.movieDetailsCast$.next).toHaveBeenCalled();
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getMovieCastById function with tvshow type', () => {
    spyOn(http, 'get').and.returnValue(of(castListFromAPI));
    spyOn(service.movieDetailsCast$, 'next');
    spyOn(service.movieLoaded$, 'next');
    service.getMovieCastById('1234', 'tvshow');
    expect(service.movieDetailsCast$.next).toHaveBeenCalled();
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getMovieCastById function throw error', () => {
    spyOn(http, 'get').and.returnValue(throwError({ status: 404 }));
    spyOn(service.hasError$, 'next');
    service.getMovieCastById('1234', 'tvshow');
    expect(service.hasError$.next).toHaveBeenCalledWith(true);
  });

  it('getMovieCrewById function with movie type', () => {
    spyOn(http, 'get').and.returnValue(of(castListFromAPI));
    spyOn(service.movieDetailCrew$, 'next');
    spyOn(service.movieLoaded$, 'next');
    service.getMovieCrewById('1234', 'movie');
    expect(service.movieDetailCrew$.next).toHaveBeenCalled();
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getMovieCrewById function with tvshow type', () => {
    spyOn(http, 'get').and.returnValue(of(castListFromAPI));
    spyOn(service.movieDetailCrew$, 'next');
    spyOn(service.movieLoaded$, 'next');
    service.getMovieCrewById('1234', 'tvshow');
    expect(service.movieDetailCrew$.next).toHaveBeenCalled();
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getMovieCrewById function throw error', () => {
    spyOn(http, 'get').and.returnValue(throwError({ status: 404 }));
    spyOn(service.hasError$, 'next');
    service.getMovieCrewById('1234', 'tvshow');
    expect(service.hasError$.next).toHaveBeenCalledWith(true);
  });

  it('getMovieReviewById function with movie type', () => {
    spyOn(http, 'get').and.returnValue(of({ results: [reviewListFromAPI] }));
    spyOn(service.movieDetailReviewList$, 'next');
    spyOn(service.movieLoaded$, 'next');
    service.getMovieReviewById('1234', 'movie');
    expect(service.movieDetailReviewList$.next).toHaveBeenCalled();
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getMovieReviewById function with review list', () => {
    spyOn(http, 'get').and.returnValue(of({ results: [reviewListFromAPI] }));
    spyOn(service.movieDetailReviewList$, 'next');
    spyOn(service.movieLoaded$, 'next');
    service.getMovieReviewById('1234', 'movie');
    expect(service.movieDetailReviewList$.next).toHaveBeenCalled();
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getMovieReviewById function with review list has avatar path includes https', () => {
    const clonedReview = structuredClone(reviewListFromAPI);
    clonedReview.author_details.avatar_path = 'http:/example.com';
    spyOn(http, 'get').and.returnValue(of({ results: [clonedReview] }));
    spyOn(service.movieDetailReviewList$, 'next');
    spyOn(service.movieLoaded$, 'next');
    service.getMovieReviewById('1234', 'movie');
    expect(service.movieDetailReviewList$.next).toHaveBeenCalled();
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getMovieReviewById function throw error', () => {
    spyOn(http, 'get').and.returnValue(throwError({ status: 404 }));
    spyOn(service.hasError$, 'next');
    service.getMovieReviewById('1234', 'tvshow');
    expect(service.hasError$.next).toHaveBeenCalledWith(true);
  });

  it('getVideoById function with review list has avatar path includes https', () => {
    spyOn(http, 'get').and.returnValue(of({ results: [sampleVideoFromAPI] }));
    spyOn(service.movieDetailVideoList$, 'next');
    spyOn(service.movieLoaded$, 'next');
    service.getVideoById('1234', 'movie');
    expect(service.movieDetailVideoList$.next).toHaveBeenCalled();
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getVideoById function with review list has avatar path includes https', () => {
    const clonedReview = structuredClone(sampleVideoFromAPI);
    clonedReview.site = 'facebook';
    spyOn(http, 'get').and.returnValue(of({ results: [clonedReview] }));
    spyOn(service.movieDetailVideoList$, 'next');
    spyOn(service.movieLoaded$, 'next');
    service.getVideoById('1234', 'movie');
    expect(service.movieDetailVideoList$.next).toHaveBeenCalled();
    expect(service.movieLoaded$.next).toHaveBeenCalledWith(true);
  });

  it('getVideoById function throw error', () => {
    spyOn(http, 'get').and.returnValue(throwError({ status: 404 }));
    spyOn(service.hasError$, 'next');
    service.getVideoById('1234', 'tvshow');
    expect(service.hasError$.next).toHaveBeenCalledWith(true);
  });
});
