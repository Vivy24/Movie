import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { Movie, movieType } from 'src/app/models/model';
import { ListService } from 'src/app/services/list.service';
import { LoadIndicatorService } from 'src/app/services/load-indicator.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss'],
})
export class MylistComponent implements OnInit {
  favMovieList: Array<Movie> = [];
  favTvshowList: Array<Movie> = [];
  saveMovieList: Array<Movie> = [];
  saveTvshowList: Array<Movie> = [];
  type = 'favourite';
  movieType = movieType;
  constructor(
    private listService: ListService,
    public loadIndicatorService: LoadIndicatorService
  ) {
    if (!localStorage.getItem('reload')) {
      localStorage.setItem('reload', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('reload');
    }
  }
  onValChange = (value: string) => {
    this.type = value === 'fav' ? 'favourite' : 'save';
  };

  ngOnInit(): void {
    this.listService.getFavouriteMovieList(
      localStorage.getItem('sessionID') as string,
      localStorage.getItem('accountID') as string
    );
    this.listService.getFavouriteTvshowList(
      localStorage.getItem('sessionID') as string,
      localStorage.getItem('accountID') as string
    );

    this.listService.getSavedMovieList(
      localStorage.getItem('sessionID') as string,
      localStorage.getItem('accountID') as string
    );

    this.listService.getSavedTvshowList(
      localStorage.getItem('sessionID') as string,
      localStorage.getItem('accountID') as string
    );

    this.listService.favMovieList$.pipe(filter((movie) => !!movie)).subscribe({
      next: (listOfMovie) => {
        this.favMovieList = listOfMovie;
      },
      // error: (error) => {
      //   console.log(error);
      // },
    });
    this.listService.favTvshowList$.pipe(filter((movie) => !!movie)).subscribe({
      next: (listOfMovie) => {
        this.favTvshowList = listOfMovie;
      },
      // error: (error) => {
      //   console.log(error);
      // },
    });

    this.listService.saveMovieList$.pipe(filter((movie) => !!movie)).subscribe({
      next: (listOfMovie) => {
        this.saveMovieList = listOfMovie;
      },
      // error: (error) => {
      //   console.log(error);
      // },
    });

    this.listService.saveMovieList$.pipe(filter((movie) => !!movie)).subscribe({
      next: (listOfMovie) => {
        this.saveTvshowList = listOfMovie;
      },
      // error: (error) => {
      //   console.log(error);
      // },
    });
  }
}
