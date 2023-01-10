import { Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { Movie, MovieDetail } from 'src/app/models/model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-landing-card',
  templateUrl: './landing-card.component.html',
  styleUrls: ['./landing-card.component.scss']
})
export class LandingCardComponent implements OnInit {
  @Input() movie?: Movie;
  @Input() movieDetail?: MovieDetail;
  constructor() { }
  ngOnInit(): void {
    console.log(this.movieDetail);
  }
}
