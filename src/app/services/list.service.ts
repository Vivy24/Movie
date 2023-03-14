import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { decryptData } from '../helpers/encrypt';
import { Movie } from '../models/model';
import { ApiControllerService } from './api-controller.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  favMovieList$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<
    Array<Movie>
  >([]);
  favTvshowList$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<
    Array<Movie>
  >([]);
  saveMovieList$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<
    Array<Movie>
  >([]);
  saveTvshowList$: BehaviorSubject<Array<Movie>> = new BehaviorSubject<
    Array<Movie>
  >([]);
  constructor(
    private httpClient: HttpClient,
    private apiController: ApiControllerService
  ) {}

  movieLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  hasError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getFavouriteMovieList(
    encryptSession: string,
    encryptAccountID: string
  ) {
    const sessionID = decryptData(encryptSession);
    const accountID = decryptData(encryptAccountID);
    this.apiController.getMovie(
      `https://api.themoviedb.org/3/account/${accountID}/favorite/movies?api_key=${environment.HTTP_API_KEY}&session_id=${sessionID}`,
      this.favMovieList$,
      'movie'
    );
  }

  public getFavouriteTvshowList(
    encryptSession: string,
    encryptAccountID: string
  ) {
    const sessionID = decryptData(encryptSession);
    const accountID = decryptData(encryptAccountID);
    this.apiController.getMovie(
      `https://api.themoviedb.org/4/account/${accountID}/tv/favorites?page=1&api_key=${environment.HTTP_API_KEY}&session_id=${sessionID}`,
      this.favTvshowList$,
      'tv'
    );
  }

  public getSavedMovieList(encryptSession: string, encryptAccountID: string) {
    const sessionID = decryptData(encryptSession);
    const accountID = decryptData(encryptAccountID);
    this.apiController.getMovie(
      `https://api.themoviedb.org/3/account/${accountID}/watchlist/tv?api_key=${environment.HTTP_API_KEY}&language=en-US&sort_by=created_at.asc&page=1&session_id=${sessionID}`,
      this.saveMovieList$,
      'movie'
    );
  }

  public getSavedTvshowList(encryptSession: string, encryptAccountID: string) {
    const sessionID = decryptData(encryptSession);
    const accountID = decryptData(encryptAccountID);

    this.apiController.getMovie(
      `https://api.themoviedb.org/3/account/${accountID}/watchlist/movies?api_key=${environment.HTTP_API_KEY}&language=en-US&sort_by=created_at.asc&page=1&session_id=${sessionID}`,
      this.saveTvshowList$,
      'tv'
    );
  }
}
