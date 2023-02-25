import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiControllerService } from './api-controller.service';

@Injectable({
  providedIn: 'root',
})
export class LoadIndicatorService {
  resourceAndDataLoaded$!: Observable<boolean>;
  criticalError$ = new BehaviorSubject<boolean>(false);

  constructor(private apiController: ApiControllerService) {
    this.resourceAndDataLoaded$ = this.apiController.movieLoaded$;
    this.criticalError$ = this.apiController.hasError$;
  }
}
