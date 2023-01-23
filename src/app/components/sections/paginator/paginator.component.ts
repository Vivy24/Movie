import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  numberArray: Array<number> = Array.from({ length: 500 }, (_, i) => i + 1)
  @Input() currentPage: number = 1
  @Input() totalPages = 500
  @Input() windowSize: number = 5
  @Input() type?: string;
  @Input() genreId?: string;
  @Input() showFirstLastButton = true
  @Input() routerLinkBase: string = this.genreId ? 'genres' : '';
  previousPage: number = this.currentPage - 1;
  nextPage: number = this.currentPage + 1;
  showingPage: Array<number> = Array.from({ length: 10 }, (_, i) => i + 1)
  constructor() { }

  ngOnInit(): void {
  }

  updateFirst() {
    this.currentPage = 1;
    this.previousPage = 1;
    this.nextPage = 2;
    this.showingPage = Array.from({ length: 10 }, (_, i) => i + 1);

  }

  updateLast() {
    this.currentPage = 500;
    this.previousPage = 499;
    this.nextPage = 500;
    this.showingPage = Array.from({ length: 10 }, (_, i) => i + + 491);
  }

  updateShowPage() {

    if (this.currentPage > this.windowSize) {
      this.showingPage = this.numberArray.slice(+this.currentPage - +this.windowSize, +this.currentPage + +this.windowSize)
    }
    else if (this.currentPage < this.windowSize) {
      this.showingPage = Array.from({ length: 10 }, (_, i) => i + 1);
    }
  }
  updateCurrentPage(event: any) {
    this.currentPage = event.srcElement.innerText >= 500 ? 500 : event.srcElement.innerText;
    this.previousPage = this.currentPage - 1;
    this.nextPage = +this.currentPage + 1;
    this.updateShowPage();

  }

  updatePrevious() {
    this.currentPage = +this.previousPage <= 1 ? 1 : this.previousPage
    this.previousPage = +this.currentPage - 1;
    this.nextPage = +this.currentPage + 1;
    this.updateShowPage();

  }

  updateNext() {
    this.currentPage = +this.nextPage >= 500 ? 500 : +this.nextPage;
    this.nextPage = +this.currentPage + 1;
    this.previousPage = +this.currentPage - 1;

    this.updateShowPage();

  }
}
