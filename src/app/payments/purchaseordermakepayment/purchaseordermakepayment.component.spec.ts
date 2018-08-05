import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseordermakepaymentComponent } from './purchaseordermakepayment.component';

describe('PurchaseordermakepaymentComponent', () => {
  let component: PurchaseordermakepaymentComponent;
  let fixture: ComponentFixture<PurchaseordermakepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseordermakepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseordermakepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
