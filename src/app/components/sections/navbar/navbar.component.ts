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
  listOfGenre: Array<Genre> = [];
  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    if (this.listOfGenre.length == 0) {
      this.moviesService.getGenres();

    }

    // subscribe to the genre list
    this.moviesService.listOfGenres$.pipe(filter(genre => !!genre)).subscribe({
      next: genre => {
        this.listOfGenre = genre
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
