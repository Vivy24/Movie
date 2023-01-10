import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() movie?: Movie;
  constructor() { }

  ngOnInit(): void {
  }

}
