import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/model';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {
  @Input() movieList?: Array<Movie>
  constructor() { }

  ngOnInit(): void {
  }

}
