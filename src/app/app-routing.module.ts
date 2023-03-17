import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieMoreList } from './components/pages/movie-more-list/movie-more-list.component';
import { MainpageComponent } from './components/pages/mainpage/mainpage.component';
import { MovieDetailsComponent } from './components/pages/movie-details/movie-details.component';
import { MylistComponent } from './components/pages/mylist/mylist.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { CastListComponent } from './components/pages/cast-list/cast-list.component';
import { ReviewComponent } from './components/pages/review/review.component';
import { PageApiErrorComponent } from './components/pages/page-api-error/page-api-error.component';
import { VideoPageComponent } from './components/pages/video-page/video-page.component';
import { AuthenticationPageComponent } from './components/pages/authentication-page/authentication-page.component';
import { AuthGuard } from './helpers/authentication';
import { AuthorizePageComponent } from './components/pages/authorize-page/authorize-page.component';

const routes: Routes = [
  { path: 'home', component: MainpageComponent },
  { path: 'new/:page', component: MovieMoreList, data: { section: 'new' } },
  {
    path: 'toprated/:page',
    component: MovieMoreList,
    data: { section: 'toprated' },
  },
  {
    path: 'popular/:page',
    component: MovieMoreList,
    data: { section: 'popular' },
  },
  {
    path: 'genres/:type/:id/:page',
    component: MovieMoreList,
    data: { section: 'genre' },
  },
  {
    path: 'myList',
    component: MylistComponent,
    canActivate: [AuthGuard],
  },

  { path: ':type/details/:id', component: MovieDetailsComponent },
  { path: ':type/casts/:id', component: CastListComponent },
  { path: ':type/reviews/:id', component: ReviewComponent },
  { path: ':type/videos/:id', component: VideoPageComponent },
  { path: 'server/error', component: PageApiErrorComponent },
  { path: 'authentication', component: AuthenticationPageComponent },
  { path: 'authorized', component: AuthorizePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
