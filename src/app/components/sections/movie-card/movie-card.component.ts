import { Component, Input, OnInit } from '@angular/core';
import { Movie, movieType } from 'src/app/models/model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie?: Movie;
  @Input() type?: movieType;
  typeURL = '';

  ngOnInit(): void {
    this.typeURL = this.type === movieType.Movie ? 'movie' : 'tvshow';
  }
}
