import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './components/pages/mainpage/mainpage.component';
import { MylistComponent } from './components/pages/mylist/mylist.component';
import { NavbarComponent } from './components/sections/navbar/navbar.component';
import { MovieComponent } from './components/sections/movie/movie.component';
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

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    MylistComponent,
    NavbarComponent,
    MovieComponent,
    SlideshowComponent,
    PageNotFoundComponent,
    AddtoFavComponent,
    AddMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
