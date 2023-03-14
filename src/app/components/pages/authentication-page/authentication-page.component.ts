import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss'],
})
export class AuthenticationPageComponent {
  constructor(private authenticationService: AuthenticationService) {}

  grantAccess(): void {
    this.authenticationService.directToAuthorization();
  }
}
