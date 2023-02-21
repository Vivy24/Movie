import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Video } from 'src/app/models/model';
import { ApiControllerService } from 'src/app/services/api-controller.service';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})
export class VideoPageComponent implements OnInit {
  type?: string;
  movieID?: string;
  videoList: Array<Video> = [];
  constructor(route: ActivatedRoute, private apiController: ApiControllerService) {
    route.params
      .subscribe(
        (val) => {
          this.type = val["type"].toLowerCase();
          this.movieID = val['id'];
          this.apiController.getVideoById(this.movieID!, this.type!);
        })
  }

  ngOnInit(): void {

    this.apiController.movieDetailVideoList$.pipe(filter(video => !!video)).subscribe({
      next: videoList => {
        this.videoList = videoList;
      },
      error: error => {
        console.log(error)
      }
    })


  }

}
