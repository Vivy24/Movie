// import { HttpClientModule } from '@angular/common/http';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import { MylistComponent } from './mylist.component';
// import { WINDOW } from 'src/app/app.module';

// describe('MylistComponent', () => {
//   let component: MylistComponent;
//   let fixture: ComponentFixture<MylistComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientModule, MatProgressSpinnerModule, MatButtonToggleModule],
//       declarations: [MylistComponent],
//       providers: [
//         {
//           provide: WINDOW,
//           useValue: {
//             location: {
//               reload: () => undefined, // or a spy
//             },
//           },
//         },]
//     }).compileComponents();

//     fixture = TestBed.createComponent(MylistComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
