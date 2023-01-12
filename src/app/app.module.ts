import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './components/pages/mainpage/mainpage.component';
import { MylistComponent } from './components/pages/mylist/mylist.component';
import { NavbarComponent } from './components/sections/navbar/navbar.component';
import { SlideshowComponent } from './components/sections/slideshow/slideshow.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { AddtoFavComponent } from './components/pages/Page/List/addto-fav/addto-fav.component';
import { AddMovieComponent } from './components/pages/Page/List/add-movie/add-movie.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingCardComponent } from './components/sections/landing-card/landing-card.component';
import { ItemCardComponent } from './components/sections/item-card/item-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { IvyCarouselModule } from 'carousel-angular';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { GenreSearchComponent } from './components/pages/genre-search/genre-search.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    MylistComponent,
    NavbarComponent,
    SlideshowComponent,
    PageNotFoundComponent,
    AddtoFavComponent,
    AddMovieComponent,
    LandingCardComponent,
    ItemCardComponent,
    GenreSearchComponent,

  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    IvyCarouselModule,
    MatButtonToggleModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      animation: false,
      radius: 60,
      space: -10,
      title: "auto",
      subtitle: "user scores",
      outerStrokeWidth: 10,
      innerStrokeWidth: 10,
      renderOnClick: false,
      outerStrokeColor: "#5c5c5c",
      innerStrokeColor: "#d7d7d7",
      responsive: true,
      titleFontSize: "25px",
      subtitleFontSize: "15px",
      subtitleFontWeight: "700",
      subtitleColor: "#5c5c5c",
      showUnits: true,
    })

  ]
})
export class AppModule { }
