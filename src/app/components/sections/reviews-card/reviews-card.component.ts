import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/models/model';

@Component({
  selector: 'app-reviews-card',
  templateUrl: './reviews-card.component.html',
  styleUrls: ['./reviews-card.component.scss']
})
export class ReviewsCardComponent implements OnInit {
  @Input() reviewInfo?: Review;
  reviewDate?: string;
  constructor() {

  }

  ngOnInit(): void {
    this.reviewDate = this.reviewInfo && `${this.reviewInfo.createdAt.getFullYear()} - ${this.reviewInfo.createdAt.getMonth() + 1} - ${this.reviewInfo.createdAt.getDate() < 10 ? '0' : ""}${this.reviewInfo.createdAt.getDate()}`
  }

}
