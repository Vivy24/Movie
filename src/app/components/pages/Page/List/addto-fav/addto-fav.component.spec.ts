import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtoFavComponent } from './addto-fav.component';

describe('AddtoFavComponent', () => {
  let component: AddtoFavComponent;
  let fixture: ComponentFixture<AddtoFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtoFavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtoFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
