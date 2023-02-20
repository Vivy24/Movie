import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoadIndicatorService } from './services/load-indicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'movie-stream';
  hasError: boolean = false;
  constructor(public loadIndicatorService: LoadIndicatorService, private router: Router) { }

  ngOnInit(): void {
    this.loadIndicatorService.criticalError$.pipe(filter(error => !!error)).subscribe({
      next: hasError => {
        if (hasError) {
          this.hasError = hasError;
          this.router.navigateByUrl('/server/error')
        }
      }
    })
  }

}
