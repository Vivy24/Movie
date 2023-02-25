import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Review } from 'src/app/models/model';
import { ApiControllerService } from 'src/app/services/api-controller.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  reviewList: Array<Review> = [];
  type = '';
  id = '';
  constructor(
    route: ActivatedRoute,
    private apiController: ApiControllerService
  ) {
    route.params.subscribe((val) => {
      this.type = val['type'].toLowerCase();
      this.id = val['id'];
      this.apiController.getMovieReviewById(this.id!, this.type!);
    });
  }

  ngOnInit(): void {
    this.apiController.movieDetailReviewList$
      .pipe(filter((review) => !!review))
      .subscribe({
        next: (reviewList) => {
          this.reviewList = reviewList;
        },
        // error: (error) => {
        //   console.log(error);
        // },
      });
  }
}
