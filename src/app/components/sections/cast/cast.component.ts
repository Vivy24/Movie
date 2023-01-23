import { Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/models/model';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent implements OnInit {
  @Input() castInfo?: Cast;
  constructor() { }

  ngOnInit(): void {
  }

}
