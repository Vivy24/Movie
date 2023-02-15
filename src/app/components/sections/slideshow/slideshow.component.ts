import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/model';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {
  @Input() title?: String
  @Input() movieList?: Array<Movie>
  @Input() tvShowList?: Array<Movie>
  renderMoviesList?: Array<Movie>;
  innerWidth?: number;
  numberOfCells: number = 0;
  type?: string = 'movie';
  constructor() { }

  ngOnInit(): void {
    this.renderMoviesList = this.movieList;
    this.setNumberOfCells();

  }

  setNumberOfCells = () => {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 350) {
      this.numberOfCells = 2;
    }
    else if (this.innerWidth < 600) {
      this.numberOfCells = 3;
    }
    else if (this.innerWidth < 750) {
      this.numberOfCells = 4;
    }
    else if (this.innerWidth < 900) {
      this.numberOfCells = 5;
    }
  }


  onValChange = (value: any) => {
    this.type = value;
    this.renderMoviesList = this.type == 'movie' ? this.movieList : this.tvShowList;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setNumberOfCells();
  }

}
