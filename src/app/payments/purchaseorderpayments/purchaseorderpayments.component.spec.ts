import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseorderpaymentsComponent } from './purchaseorderpayments.component';

describe('PurchaseorderpaymentsComponent', () => {
  let component: PurchaseorderpaymentsComponent;
  let fixture: ComponentFixture<PurchaseorderpaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseorderpaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseorderpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
