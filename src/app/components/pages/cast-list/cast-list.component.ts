import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Cast } from 'src/app/models/model';
import { ApiControllerService } from 'src/app/services/api-controller.service';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.scss']
})
export class CastListComponent implements OnInit {
  type?: string;
  id?: string;
  castArray: Array<Cast> = [];
  crewArray: Array<Cast> = [];
  constructor(route: ActivatedRoute, private apiController: ApiControllerService) {
    route.params
      .subscribe(
        (val) => {
          this.type = val["type"];
          this.id = val["id"]

          if (this.type == 'movie') {
            this.apiController.getMovieCastById(this.id!, 'movie');
            this.apiController.getMovieCrewById(this.id!, 'movie')
          }
          else {
            this.apiController.getMovieCastById(this.id!, 'tvshow');
            this.apiController.getMovieCrewById(this.id!, 'tvshow');

          }
        }
      );
  }

  ngOnInit(): void {
    this.apiController.movieDetailsCast$.pipe(filter(cast => !!cast)).subscribe({
      next: castList => {
        this.castArray = castList;
      },
      error: error => {
        console.log(error)
      }
    })

    this.apiController.movieDetailCrew$.pipe(filter(cast => !!cast)).subscribe({
      next: crewList => {
        this.crewArray = crewList;
      },
      error: error => {
        console.log(error)
      }
    })
  }
}



