import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Genre } from "../models/model"
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  listOfGenres$: BehaviorSubject<Array<Genre>> = new BehaviorSubject<Array<Genre>>([]);

  constructor(
    private httpClient: HttpClient
  ) { }

  // Send GET to the API to get genres. 
  public getGenres() {
    let headers = new HttpHeaders({
      'X-RapidAPI-Key': '20b2d1579bmsh8fd0a94c4d01c8ap1d251cjsn325297cf0784',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    })

    this.httpClient.get<any>('https://streaming-availability.p.rapidapi.com/genres', {
      headers: headers
    }).subscribe({
      next: listOfGenre => {
        const arrayGenre: Array<Genre> = [];
        for (const key in listOfGenre) {
          const genre: Genre = {
            id: +key,
            name: listOfGenre[key]
          }

          arrayGenre.push(genre)
        }
        this.listOfGenres$.next(arrayGenre)
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
