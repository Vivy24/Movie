import { Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { filter } from 'rxjs';
import { Genre } from 'src/app/models/model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChildren(MatMenuTrigger) triggers: QueryList<MatMenuTrigger> | undefined;
  listOfMovieGenre: Array<Genre> = [];
  listOfTvShowGenre: Array<Genre> = [];
  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    if (this.listOfMovieGenre.length == 0) {
      this.moviesService.getMovieGenres();
    }

    if (this.listOfTvShowGenre.length == 0) {
      this.moviesService.getTvShowGenres();
    }

    // subscribe to the movie genre list
    this.moviesService.listOfMovieGenres$.pipe(filter(genre => !!genre)).subscribe({
      next: genre => {
        this.listOfMovieGenre = genre
      },
      error: error => {
        console.log(error);
      }
    })

    this.moviesService.listOfTvShowGenres$.pipe(filter(genre => !!genre)).subscribe({
      next: genre => {
        this.listOfTvShowGenre = genre
      },
      error: error => {
        console.log(error);
      }
    })
  }

  // close all menu when window screen change
  @HostListener('window:resize', ['$event'])

  onResize(event: any) {
    this.triggers?.toArray().forEach(menu => menu.closeMenu());
  }

}
