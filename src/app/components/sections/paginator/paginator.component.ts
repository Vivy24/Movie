import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  numberArray: Array<number> = Array.from({ length: 300 }, (_, i) => i + 1);
  @Input() currentPage = 1;
  @Input() totalPages = 300;
  @Input() windowSize = 5;
  @Input() type?: string;
  @Input() genreId?: string;
  @Input() showFirstLastButton = true;
  @Input() routerLinkBase: string = this.genreId ? 'genres' : '';
  previousPage: number = this.currentPage - 1;
  nextPage: number = this.currentPage + 1;
  showingPage: Array<number> = Array.from(
    { length: this.windowSize > 1 ? this.windowSize + this.windowSize : 1 },
    (_, i) => i + 1
  );
  // constructor() { }

  ngOnInit(): void {
    this.setNumberOfWindowSize();
    this.routerLinkBase = this.genreId ? 'genres' : '';
  }

  updateFirst() {
    this.currentPage = 1;
    this.previousPage = 1;
    this.nextPage = 2;
    this.showingPage = Array.from({ length: 10 }, (_, i) => i + 1);
  }

  updateLast() {
    this.currentPage = 300;
    this.previousPage = 299;
    this.nextPage = 300;
    this.showingPage = Array.from({ length: 10 }, (_, i) => i + +291);
  }

  updateShowPage() {
    this.windowSize = 5;
    if (this.currentPage >= this.windowSize) {
      this.showingPage = this.numberArray.slice(
        +this.currentPage - +this.windowSize,
        +this.currentPage + +this.windowSize
      );
    } else if (this.currentPage < this.windowSize) {
      this.showingPage = Array.from({ length: 10 }, (_, i) => i + 1);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateCurrentPage(event: any) {
    this.currentPage =
      event.srcElement.innerText >= 300 ? 300 : event.srcElement.innerText;
    this.previousPage = this.currentPage - 1;
    this.nextPage = +this.currentPage + 1;
    this.updateShowPage();
  }

  updatePrevious() {
    this.currentPage = +this.previousPage <= 1 ? 1 : this.previousPage;
    this.previousPage = +this.currentPage - 1;
    this.nextPage = +this.currentPage + 1;
    this.updateShowPage();
  }

  updateNext() {
    this.currentPage = +this.nextPage >= 300 ? 300 : +this.nextPage;
    this.nextPage = +this.currentPage + 1;
    this.previousPage = +this.currentPage - 1;

    this.updateShowPage();
  }

  setNumberOfWindowSize = () => {
    if (window.innerWidth < 350) {
      this.windowSize = 2;
      this.updateShowPage();
    } else if (window.innerWidth < 600) {
      this.windowSize = 3;
      this.updateShowPage();
    } else if (window.innerWidth < 750) {
      this.windowSize = 4;
      this.updateShowPage();
    } else if (window.innerWidth < 900) {
      this.windowSize = 5;
      this.updateShowPage();
    }
  };

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setNumberOfWindowSize();
  }
}
