// import { HttpClientModule } from '@angular/common/http';
// import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatIconModule } from '@angular/material/icon';
// import { CircleProgressOptions } from 'ng-circle-progress';

// import { LandingCardComponent } from './landing-card.component';

// @Component({
//   selector: 'circle-progress',
//   template: "",
// })
// class CircleProgressComponent {
//   @Input() percent: number | undefined;
// }

// describe('LandingCardComponent', () => {
//   let component: LandingCardComponent;
//   let fixture: ComponentFixture<LandingCardComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientModule, MatIconModule],
//       declarations: [LandingCardComponent, CircleProgressComponent],
//       providers: [
//         {
//           provide: MatDialog,
//           useValue: {},
//         },
//         {
//           provide: MAT_DIALOG_DATA,
//           useValue: {},
//         },
//         {
//           provide: CircleProgressOptions,
//           useValue: "",
//         }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     }).compileComponents();

//     fixture = TestBed.createComponent(LandingCardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
