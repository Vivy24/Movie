import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Review } from 'src/app/models/model';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowService } from 'src/app/services/tvshow.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  reviewList: Array<Review> = [];
  type: string = "";
  id: string = "";
  constructor(route: ActivatedRoute, private movieService: MoviesService, private tvService: TvshowService) {
    route.params
      .subscribe(
        (val) => {
          this.type = val["type"];
          this.id = val["id"]

          if (this.type == 'movie') {
            this.movieService.getMovieReviewById(this.id!);
          }
          else {
            this.tvService.getTvshowReviewById(this.id!);
          }
        }
      );
  }

  ngOnInit(): void {
    this.movieService.movieDetailReviewList$.pipe(filter(review => !!review)).subscribe({
      next: reviewList => {
        this.reviewList = reviewList;
      },
      error: error => {
        console.log(error)
      }
    })
  }


}
