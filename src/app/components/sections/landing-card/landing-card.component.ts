import { Component, Input, OnInit } from '@angular/core';
import { Movie, MovieDetail } from 'src/app/models/model';

@Component({
  selector: 'app-landing-card',
  templateUrl: './landing-card.component.html',
  styleUrls: ['./landing-card.component.scss']
})
export class LandingCardComponent implements OnInit {
  @Input() movie?: Movie;
  @Input() movieDetail?: MovieDetail;
  @Input() type?: string;
  @Input() mainPage?: boolean;
  constructor() { }
  ngOnInit(): void {
  }
}
