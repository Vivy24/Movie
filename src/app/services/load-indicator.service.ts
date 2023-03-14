import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { ApiControllerService } from './api-controller.service';
import { ListService } from './list.service';

@Injectable({
  providedIn: 'root',
})
export class LoadIndicatorService {
  resourceAndDataLoaded$!: Observable<boolean>;
  criticalError$ = new BehaviorSubject<boolean>(false);

  constructor(
    private apiController: ApiControllerService,
    private listService: ListService
  ) {
    this.resourceAndDataLoaded$ = combineLatest([
      this.apiController.movieLoaded$,
      this.listService.movieLoaded$,
    ]).pipe(
      map(([s, r]) => {
        return s && r;
      })
    );

    this.criticalError$ =
      this.apiController.hasError$ || this.listService.hasError$;
  }
}
