import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpaymentComponent } from './listpayment.component';

describe('ListpaymentComponent', () => {
  let component: ListpaymentComponent;
  let fixture: ComponentFixture<ListpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
