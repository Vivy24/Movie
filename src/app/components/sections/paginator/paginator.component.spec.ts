import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updateFirst function', () => {
    component.updateFirst();
    fixture.detectChanges();
    expect(component.currentPage).toEqual(1);
    expect(component.previousPage).toEqual(1);
    expect(component.nextPage).toEqual(2);
    expect(component.showingPage).toEqual(
      Array.from({ length: 10 }, (_, i) => i + 1)
    );
  });

  it('updateLast function', () => {
    component.updateLast();
    fixture.detectChanges();
    expect(component.currentPage).toEqual(300);
    expect(component.previousPage).toEqual(299);
    expect(component.nextPage).toEqual(300);
    expect(component.showingPage).toEqual(
      Array.from({ length: 10 }, (_, i) => i + 291)
    );
  });

  it('updateShowPage function with currentPage < windowSize', () => {
    component.updateShowPage();
    fixture.detectChanges();
    expect(component.windowSize).toEqual(5);
    expect(component.showingPage).toEqual(
      Array.from({ length: 10 }, (_, i) => i + 1)
    );
  });

  it('updateShowPage function with currentPage > windowSize', () => {
    component.currentPage = 10;
    component.windowSize = 5;
    fixture.detectChanges();

    component.updateShowPage();
    fixture.detectChanges();
    expect(component.windowSize).toEqual(5);
    expect(component.showingPage).toEqual(
      component.numberArray.slice(
        +component.currentPage - +component.windowSize,
        +component.currentPage + +component.windowSize
      )
    );
  });
  it('updateCurrentPage function smaller than 300', () => {
    spyOn(component, 'updateShowPage');
    component.updateCurrentPage({
      srcElement: {
        innerText: 4,
      },
    });
    fixture.detectChanges();
    expect(component.currentPage).toEqual(4);
    expect(component.previousPage).toEqual(3);
    expect(component.nextPage).toEqual(5);
    expect(component.updateShowPage).toHaveBeenCalled();
  });

  it('updateCurrentPage function larger than 300', () => {
    spyOn(component, 'updateShowPage');
    component.updateCurrentPage({
      srcElement: {
        innerText: 304,
      },
    });
    fixture.detectChanges();
    expect(component.currentPage).toEqual(300);
    expect(component.previousPage).toEqual(299);
    expect(component.nextPage).toEqual(300);
    expect(component.updateShowPage).toHaveBeenCalled();
  });

  it('updatePrevious function when previous page < 1', () => {
    spyOn(component, 'updateShowPage');
    component.previousPage = -1;
    fixture.detectChanges();
    component.updatePrevious();
    fixture.detectChanges();
    expect(component.currentPage).toEqual(1);
    expect(component.previousPage).toEqual(0);
    expect(component.nextPage).toEqual(2);
    expect(component.updateShowPage).toHaveBeenCalled();
  });

  it('updatePrevious function when previous page > 1', () => {
    spyOn(component, 'updateShowPage');
    component.previousPage = 2;
    fixture.detectChanges();
    component.updatePrevious();
    fixture.detectChanges();
    expect(component.currentPage).toEqual(2);
    expect(component.previousPage).toEqual(1);
    expect(component.nextPage).toEqual(3);
    expect(component.updateShowPage).toHaveBeenCalled();
  });

  it('updateNext function with nextPage > 300', () => {
    spyOn(component, 'updateShowPage');
    component.nextPage = 302;
    fixture.detectChanges();
    component.updateNext();
    fixture.detectChanges();
    expect(component.currentPage).toEqual(300);
    expect(component.previousPage).toEqual(299);
    expect(component.nextPage).toEqual(301);
    expect(component.updateShowPage).toHaveBeenCalled();
  });

  it('updateNext function with nextPage < 300', () => {
    spyOn(component, 'updateShowPage');
    component.nextPage = 200;
    fixture.detectChanges();
    component.updateNext();
    fixture.detectChanges();
    expect(component.currentPage).toEqual(200);
    expect(component.previousPage).toEqual(199);
    expect(component.nextPage).toEqual(201);
    expect(component.updateShowPage).toHaveBeenCalled();
  });

  it('setNumberOfWindowSize function with innerWidth < 350', () => {
    spyOn(component, 'updateShowPage');
    spyOnProperty(window, 'innerWidth').and.returnValue(349);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.windowSize).toEqual(2);
    expect(component.updateShowPage).toHaveBeenCalled();
  });

  it('setNumberOfWindowSize function with innerWidth < 600', () => {
    spyOn(component, 'updateShowPage');
    spyOnProperty(window, 'innerWidth').and.returnValue(449);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.windowSize).toEqual(3);
    expect(component.updateShowPage).toHaveBeenCalled();
  });
  it('setNumberOfWindowSize function with innerWidth < 750', () => {
    spyOn(component, 'updateShowPage');
    spyOnProperty(window, 'innerWidth').and.returnValue(749);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.windowSize).toEqual(4);
    expect(component.updateShowPage).toHaveBeenCalled();
  });

  it('setNumberOfWindowSize function with innerWidth < 900', () => {
    spyOn(component, 'updateShowPage');
    spyOnProperty(window, 'innerWidth').and.returnValue(850);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.windowSize).toEqual(5);
    expect(component.updateShowPage).toHaveBeenCalled();
  });
});
