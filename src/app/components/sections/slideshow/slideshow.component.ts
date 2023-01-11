import { FormatWidth } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/model';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {
  @Input() movieCategory?: String
  @Input() movieList?: Array<Movie>
  innerWidth?: number;
  numberOfCells: number = 0;
  constructor() { }

  ngOnInit(): void {
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

}
