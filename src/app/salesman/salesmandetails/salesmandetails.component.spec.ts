import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmandetailsComponent } from './salesmandetails.component';

describe('SalesmandetailsComponent', () => {
  let component: SalesmandetailsComponent;
  let fixture: ComponentFixture<SalesmandetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesmandetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesmandetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
