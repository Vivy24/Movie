import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { Movie, MovieDetail, Video } from 'src/app/models/model';
import { ApiControllerService } from 'src/app/services/api-controller.service';
import { ListService } from 'src/app/services/list.service';
import { AnnouncementComponent } from '../../dialog/announcement/announcement.component';
import { TrailerDialogComponent } from '../../dialog/trailer-dialog/trailer-dialog.component';

@Component({
  selector: 'app-landing-card',
  templateUrl: './landing-card.component.html',
  styleUrls: ['./landing-card.component.scss'],
})
export class LandingCardComponent {
  @Input() movie?: Movie;
  @Input() movieDetail?: MovieDetail;
  @Input() type?: string;
  @Input() mainPage?: boolean;
  @Input() trailer?: Video;
  addingFav = false;
  addingSave = false;
  constructor(
    public dialog: MatDialog,
    private apiController: ApiControllerService,
    private router: Router,
    private listService: ListService
  ) {
    // ngOnInit(): void {
  }

  // }
  openTrailer(): void {
    const dialogRef = this.dialog.open(TrailerDialogComponent, {
      data: { youtubeSrc: this.trailer?.source },
    });

    dialogRef.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
    });
  }

  markFav(): void {
    if (
      localStorage.getItem('accountID') &&
      localStorage.getItem('sessionID')
    ) {
      if (this.type === 'movie') {
        this.listService.getFavouriteMovieList(
          localStorage.getItem('sessionID') as string,
          localStorage.getItem('accountID') as string
        );
        this.addingFav = true;
        this.listService.favMovieList$
          .pipe(filter((movie) => !!movie))
          .subscribe({
            next: (listOfMovie) => {
              const alreadyAdded = listOfMovie.find(
                (movie) => movie.id === this.movie?.id
              );
              if (alreadyAdded && this.addingFav) {
                this.dialog.open(AnnouncementComponent, {
                  data: {
                    content: 'Movie/tvshow has already add to favourite list',
                  },
                });
                this.addingFav = false;
              } else if (this.addingFav) {
                this.apiController.markAsFavourite(
                  localStorage.getItem('accountID') as string,
                  localStorage.getItem('sessionID') as string,
                  'movie',
                  this.movie?.id as unknown as string
                );
                this.dialog.open(AnnouncementComponent, {
                  data: {
                    content: 'Movie/tvshow has been add to favourite list',
                  },
                });
                this.addingFav = false;
              }
            },
            // error: (error) => {
            //   console.log(error);
            // },
          });
      } else {
        this.listService.getFavouriteTvshowList(
          localStorage.getItem('sessionID') as string,
          localStorage.getItem('accountID') as string
        );
        this.addingFav = true;
        this.listService.favTvshowList$
          .pipe(filter((movie) => !!movie))
          .subscribe({
            next: (listOfMovie) => {
              const alreadyAdded = listOfMovie.find(
                (movie) => movie.id === this.movie?.id
              );
              if (alreadyAdded && this.addingFav) {
                this.dialog.open(AnnouncementComponent, {
                  data: {
                    content: 'Movie/tvshow has already add to favourite list',
                  },
                });
                this.addingFav = false;
              } else if (this.addingFav) {
                this.apiController.markAsFavourite(
                  localStorage.getItem('accountID') as string,
                  localStorage.getItem('sessionID') as string,
                  'tv',
                  this.movie?.id as unknown as string
                );
                this.dialog.open(AnnouncementComponent, {
                  data: {
                    content: 'Movie/tvshow has been add to favourite list',
                  },
                });
                this.addingFav = false;
              }
            },
            // error: (error) => {
            //   console.log(error);
            // },
          });
      }
    } else {
      this.router.navigateByUrl('/authentication');
    }
  }

  markSave(): void {
    if (
      localStorage.getItem('accountID') &&
      localStorage.getItem('sessionID')
    ) {
      if (this.type === 'movie') {
        this.listService.getSavedMovieList(
          localStorage.getItem('sessionID') as string,
          localStorage.getItem('accountID') as string
        );
        this.addingSave = true;
        this.listService.saveMovieList$
          .pipe(filter((movie) => !!movie))
          .subscribe({
            next: (listOfMovie) => {
              const alreadyAdded = listOfMovie.find(
                (movie) => movie.id === this.movie?.id
              );
              if (alreadyAdded && this.addingSave) {
                this.dialog.open(AnnouncementComponent, {
                  data: {
                    content: 'Movie/tvshow has already add to saved list',
                  },
                });
                this.addingSave = false;
              } else if (this.addingSave) {
                this.apiController.markAsSave(
                  localStorage.getItem('accountID') as string,
                  localStorage.getItem('sessionID') as string,
                  'movie',
                  this.movie?.id as unknown as string
                );
                this.dialog.open(AnnouncementComponent, {
                  data: {
                    content: 'Movie/tvshow has been add to saved list',
                  },
                });
                this.addingSave = false;
              }
            },
            // error: (error) => {
            //   console.log(error);
            // },
          });
      } else {
        this.listService.getSavedTvshowList(
          localStorage.getItem('sessionID') as string,
          localStorage.getItem('accountID') as string
        );
        this.addingSave = true;
        this.listService.saveTvshowList$
          .pipe(filter((movie) => !!movie))
          .subscribe({
            next: (listOfMovie) => {
              const alreadyAdded = listOfMovie.find(
                (movie) => movie.id === this.movie?.id
              );
              if (alreadyAdded && this.addingSave) {
                this.dialog.open(AnnouncementComponent, {
                  data: {
                    content: 'Movie/tvshow has already add to saved list',
                  },
                });
                this.addingSave = false;
              } else if (this.addingSave) {
                this.apiController.markAsSave(
                  localStorage.getItem('accountID') as string,
                  localStorage.getItem('sessionID') as string,
                  'tv',
                  this.movie?.id as unknown as string
                );
                this.dialog.open(AnnouncementComponent, {
                  data: {
                    content: 'Movie/tvshow has been add to saved list',
                  },
                });
                this.addingSave = false;
              }
            },
            // error: (error) => {
            //   console.log(error);
            // },
          });
      }
    } else {
      this.router.navigateByUrl('/authentication');
    }
  }
}
