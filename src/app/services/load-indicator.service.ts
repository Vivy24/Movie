import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { MoviesService } from './movies.service';
import { TvshowService } from './tvshow.service';
@Injectable({
  providedIn: 'root'
})
export class LoadIndicatorService {
  resourceAndDataLoaded$!: Observable<boolean>;
  criticalError$ = new BehaviorSubject<boolean>(false);

  constructor(private _movieService: MoviesService, private _tvShowService: TvshowService) {
    this.resourceAndDataLoaded$ = combineLatest([this._movieService.movieLoaded$, this._tvShowService.tvShowLoaded$]).pipe(map(([s, r]) => {
      return s && r
    }))
  }
}
