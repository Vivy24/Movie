import { InjectionToken, NgModule } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { LandingCardComponent } from './components/sections/landing-card/landing-card.component';
import { ItemCardComponent } from './components/sections/item-card/item-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { IvyCarouselModule } from 'carousel-angular';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';

import { MovieMoreList } from './components/pages/movie-more-list/movie-more-list.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PaginatorComponent } from './components/sections/paginator/paginator.component';
import { MovieDetailsComponent } from './components/pages/movie-details/movie-details.component';
import { CastComponent } from './components/sections/cast/cast.component';
import { CastListComponent } from './components/pages/cast-list/cast-list.component';
import { ReviewsCardComponent } from './components/sections/reviews-card/reviews-card.component';
import { ReviewComponent } from './components/pages/review/review.component';
import { SafePipe } from './pipe/safe.pipe';
import { TrailerDialogComponent } from './components/dialog/trailer-dialog/trailer-dialog.component';
import { PageApiErrorComponent } from './components/pages/page-api-error/page-api-error.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VideoPageComponent } from './components/pages/video-page/video-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthenticationPageComponent } from './components/pages/authentication-page/authentication-page.component';
import { AuthorizePageComponent } from './components/pages/authorize-page/authorize-page.component';
import { AnnouncementComponent } from './components/dialog/announcement/announcement.component';
import { MovieCardComponent } from './components/sections/movie-card/movie-card.component';

export const WINDOW = new InjectionToken('WINDOW');
@NgModule({
  declarations: [
    AppComponent,
    PaginatorComponent,
    MainpageComponent,
    MylistComponent,
    NavbarComponent,
    SlideshowComponent,
    PageNotFoundComponent,
    LandingCardComponent,
    ItemCardComponent,
    MovieMoreList,
    PaginatorComponent,
    MovieDetailsComponent,
    CastComponent,
    CastListComponent,
    ReviewsCardComponent,
    ReviewComponent,
    TrailerDialogComponent,
    SafePipe,
    PageApiErrorComponent,
    VideoPageComponent,
    FooterComponent,
    AuthenticationPageComponent,
    AuthorizePageComponent,
    AnnouncementComponent,
    MovieCardComponent,
  ],
  providers: [
    {
      provide: WINDOW,
      useValue: window,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
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
    MatDialogModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      animation: false,
      radius: 60,
      space: -10,
      title: 'auto',
      subtitle: 'user scores',
      outerStrokeWidth: 10,
      innerStrokeWidth: 10,
      renderOnClick: false,
      outerStrokeColor: '#5c5c5c',
      innerStrokeColor: '#d7d7d7',
      responsive: true,
      titleFontSize: '25px',
      subtitleFontSize: '15px',
      subtitleFontWeight: '700',
      subtitleColor: '#5c5c5c',
      showUnits: true,
    }),
    MatProgressSpinnerModule,
  ],
})
export class AppModule {}
