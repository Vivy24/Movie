import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Movie, MovieDetail, Video } from 'src/app/models/model';
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
  constructor(public dialog: MatDialog) {}
  // ngOnInit(): void {}
  openTrailer(): void {
    const dialogRef = this.dialog.open(TrailerDialogComponent, {
      data: { youtubeSrc: this.trailer?.source },
    });

    dialogRef.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
    });
  }
}
