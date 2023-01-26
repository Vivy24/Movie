import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/models/model';

@Component({
  selector: 'app-reviews-card',
  templateUrl: './reviews-card.component.html',
  styleUrls: ['./reviews-card.component.scss']
})
export class ReviewsCardComponent implements OnInit {
  @Input() reviewInfo?: Review;
  constructor() { }

  ngOnInit(): void {
  }

}
