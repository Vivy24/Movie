import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  content: string;
}
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent {
  constructor(
    public dialogRef: MatDialogRef<AnnouncementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
