import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
@Component({
  selector: 'app-footer',
  templateUrl: './components/footer/footer.component.html',
})
class FooterComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    const mockWindow = { location: { href: '' } };
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent, FooterComponent],
      providers: [
        {
          provide: 'Window',
          useValue: mockWindow,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
