import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/model';
@Injectable({
  providedIn: 'root',
})
export class GenresService {
  listOfMovieGenres$: BehaviorSubject<Array<Genre>> = new BehaviorSubject<
    Array<Genre>
  >([]);
  listOfTvShowGenres$: BehaviorSubject<Array<Genre>> = new BehaviorSubject<
    Array<Genre>
  >([]);
  apiKey: string = environment.HTTP_API_KEY;

  constructor(private httpClient: HttpClient) {}

  // Send GET to the API to get movie's genres
  public getMovieGenres() {
    this.httpClient
      .get<{ genres: Genre[] }>(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`,
        {}
      )
      .subscribe({
        next: (data) => {
          this.listOfMovieGenres$.next(data.genres as Array<Genre>);
        },
      });
  }

  // Send GET to the API to get tvShow's genres

  public getTvShowGenres() {
    this.httpClient
      .get<{ genres: Genre[] }>(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${this.apiKey}&language=en-US`,
        {}
      )
      .subscribe({
        next: (data) => {
          this.listOfTvShowGenres$.next(data.genres as Array<Genre>);
        },
      });
  }
}
