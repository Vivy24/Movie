import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userToken } from '../models/model';
import { encryptData } from '../helpers/encrypt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private route: Router) {}

  userSessionID$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userToken$: BehaviorSubject<userToken> = new BehaviorSubject<userToken>({
    success: false,
    expires_at: '',
    request_token: '',
  });
  token: string | null = null;
  public directToAuthorization() {
    // get the user token
    this.httpClient
      .get<userToken>(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${environment.HTTP_API_KEY}`
      )
      .subscribe({
        next: (token: userToken) => {
          if (token.success) {
            this.token = token.request_token;
            window.location.href = `https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=${environment.basedAddress}/authorized`;
          } else {
            // TODO: navigate to fail path;
          }
        },
      });
  }

  public createSessionID(token: string | null) {
    if (token) {
      this.httpClient
        .post<{
          session_id: string;
          success: boolean;
        }>(
          `https://api.themoviedb.org/3/authentication/session/new?api_key=${environment.HTTP_API_KEY}`,
          { request_token: `${token}` }
        )
        .subscribe({
          next: (sessionID: { session_id: string; success: boolean }) => {
            const encryptSession =
              sessionID.success && encryptData(sessionID.session_id as string);
            if (sessionID.success && encryptSession) {
              this.userSessionID$.next(encryptSession as string);
              localStorage.setItem('sessionID', encryptSession as string);

              this.httpClient
                .get<{
                  avatar: {
                    gravatar: {
                      hash: string;
                    };
                    tmdb: {
                      avatar_path: string;
                    };
                  };
                  id: number;
                  iso_639_1: string;
                  iso_3166_1: string;
                  name: string;
                  include_adult: boolean;
                  username: string;
                }>(
                  `https://api.themoviedb.org/3/account?api_key=${environment.HTTP_API_KEY}&session_id=${sessionID.session_id}`,
                  {}
                )
                .subscribe({
                  next: (data) => {
                    const accountID = encryptData(data.id as unknown as string);
                    localStorage.setItem('accountID', accountID as string);
                  },
                });
            } else {
              // TODO: navigate to fail path;
            }
          },
        });
    } else {
      // TODO: navigate to fail path;
    }
  }
}
