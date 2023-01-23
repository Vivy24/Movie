import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieMoreList } from './components/pages/movie-more-list/movie-more-list.component';
import { MainpageComponent } from './components/pages/mainpage/mainpage.component';
import { MovieDetailsComponent } from './components/pages/movie-details/movie-details.component';
import { MylistComponent } from './components/pages/mylist/mylist.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { AddMovieComponent } from './components/pages/Page/List/add-movie/add-movie.component';
import { AddtoFavComponent } from './components/pages/Page/List/addto-fav/addto-fav.component';

const routes: Routes = [
  { path: 'home', component: MainpageComponent },
  { path: 'new/:page', component: MovieMoreList, data: { section: "new" } },
  { path: 'toprated/:page', component: MovieMoreList, data: { section: "toprated" } },
  { path: 'popular/:page', component: MovieMoreList, data: { section: "popular" } },
  { path: "myList", component: MylistComponent },
  { path: "addToFavList", component: AddtoFavComponent },
  { path: "addNewMovie", component: AddMovieComponent },
  { path: "genres/:type/:id/:page", component: MovieMoreList, data: { section: "genre" } },
  { path: "movies/details/:id", component: MovieDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
