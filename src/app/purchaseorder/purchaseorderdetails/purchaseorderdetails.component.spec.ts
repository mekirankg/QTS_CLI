import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseorderdetailsComponent } from './purchaseorderdetails.component';

describe('PurchaseorderdetailsComponent', () => {
  let component: PurchaseorderdetailsComponent;
  let fixture: ComponentFixture<PurchaseorderdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseorderdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseorderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
