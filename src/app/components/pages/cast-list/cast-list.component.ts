import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Cast } from 'src/app/models/model';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowService } from 'src/app/services/tvshow.service';

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
  constructor(route: ActivatedRoute, private movieService: MoviesService, private tvService: TvshowService) {
    route.params
      .subscribe(
        (val) => {
          this.type = val["type"];
          this.id = val["id"]

          if (this.type == 'movie') {
            this.movieService.getMovieCastById(this.id!);
            this.movieService.getMovieCrewById(this.id!)
          }
          else {
            this.tvService.getTvShowCastById(this.id!);
            this.tvService.getTvShowCrewById(this.id!);

          }
        }
      );
  }

  ngOnInit(): void {
    this.movieService.movieDetailsCast$.pipe(filter(cast => !!cast)).subscribe({
      next: castList => {
        this.castArray = castList;
      },
      error: error => {
        console.log(error)
      }
    })

    this.movieService.movieDetailCrew$.pipe(filter(cast => !!cast)).subscribe({
      next: crewList => {
        this.crewArray = crewList;
      },
      error: error => {
        console.log(error)
      }
    })

    this.tvService.tvShowCasts$.pipe(filter(cast => !!cast)).subscribe({
      next: castList => {
        this.castArray = castList;
      },
      error: error => {
        console.log(error)
      }
    })

    this.tvService.tvShowCrews$.pipe(filter(cast => !!cast)).subscribe({
      next: crewList => {
        this.crewArray = crewList;
      },
      error: error => {
        console.log(error)
      }
    })
  }
}



