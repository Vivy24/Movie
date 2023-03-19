import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Cast } from 'src/app/models/model';
import { ApiControllerService } from 'src/app/services/api-controller.service';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.scss'],
})
export class CastListComponent implements OnInit {
  type?: string;
  id?: string;
  castArray: Array<Cast> = [];
  crewArray: Array<Cast> = [];
  constructor(
    route: ActivatedRoute,
    private apiController: ApiControllerService
  ) {
    route.params.subscribe((val) => {
      this.type = val['type'].toLowerCase();
      this.id = val['id'];
      this.apiController.getMovieCastById(this.id!, this.type!);
      this.apiController.getMovieCrewById(this.id!, this.type!);
    });
  }

  ngOnInit(): void {
    this.apiController.movieDetailsCast$
      .pipe(filter((cast) => !!cast))
      .subscribe({
        next: (castList) => {
          this.castArray = castList;
        },
      });

    this.apiController.movieDetailCrew$
      .pipe(filter((cast) => !!cast))
      .subscribe({
        next: (crewList) => {
          this.crewArray = crewList;
        },
      });
  }
}
