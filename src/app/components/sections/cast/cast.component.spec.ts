import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sampleCast } from 'src/mockedData/movie';

import { CastComponent } from './cast.component';

describe('CastComponent', () => {
  let component: CastComponent;
  let fixture: ComponentFixture<CastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cast information by input', () => {
    component.castInfo = sampleCast;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('h4')).nativeElement.textContent
    ).toEqual(sampleCast.name);
    expect(
      fixture.debugElement.query(By.css('p')).nativeElement.textContent
    ).toEqual(sampleCast.character);
  });
});
