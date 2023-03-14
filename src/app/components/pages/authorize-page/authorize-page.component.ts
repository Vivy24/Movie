import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authorize-page',
  templateUrl: './authorize-page.component.html',
  styleUrls: ['./authorize-page.component.scss'],
})
export class AuthorizePageComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (
      this.route.snapshot.queryParamMap.get('request_token') &&
      (!localStorage.getItem('sessionID') || !localStorage.getItem('accountID'))
    ) {
      this.createSessionAndGetUserList(
        this.route.snapshot.queryParamMap.get('request_token') as string
      );
    }
  }
  async createSessionAndGetUserList(tokenID: string) {
    await this.authenticationService.createSessionID(tokenID);
  }
}
