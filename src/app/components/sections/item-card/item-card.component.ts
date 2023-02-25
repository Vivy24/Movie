import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Movie, movieType } from 'src/app/models/model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ItemCardComponent implements OnInit {
  @Input() movie?: Movie;
  @Input() type?: movieType;
  typeURL = '';
  // constructor() {}

  ngOnInit(): void {
    this.typeURL = this.type === movieType.Movie ? 'movie' : 'tvshow';
  }
}
