import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Movie } from 'src/app/models/model';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements OnInit {
  @ViewChild('slickModal') slickModal: SlickCarouselComponent | undefined;

  @Input() title?: string;
  @Input() movieList: Array<Movie> = [];
  @Input() tvShowList?: Array<Movie>;
  renderMoviesList: Array<Movie> = [];
  innerWidth?: number;
  numberOfCells = 0;
  type?: string = 'movie';
  slideConfig = {
    dots: true,
    arrow: true,
    infinite: true,
    lazyLoad: 'ondemand',
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  constructor() {
    this.onResize();
  }
  ngOnInit(): void {
    this.renderMoviesList = this.movieList as Array<Movie>;
  }

  setNumberOfCells = () => {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 350) {
      this.numberOfCells = 2;
    } else if (this.innerWidth < 600) {
      this.numberOfCells = 3;
    } else if (this.innerWidth < 750) {
      this.numberOfCells = 4;
    } else if (this.innerWidth < 900) {
      this.numberOfCells = 5;
    }
  };

  next() {
    this.slickModal?.slickNext();
  }

  prev() {
    this.slickModal?.slickPrev();
  }

  onValChange = (value: string) => {
    this.type = value;
    this.renderMoviesList =
      this.type === 'movie'
        ? (this.movieList as Array<Movie>)
        : (this.tvShowList as Array<Movie>);
  };
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setNumberOfCells();
    if (this.numberOfCells) {
      this.slideConfig.slidesToShow = this.numberOfCells;
      this.slideConfig.slidesToScroll = this.numberOfCells;
    }
  }
}
