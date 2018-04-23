import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationdetailsComponent } from './quotationdetails.component';

describe('QuotationdetailsComponent', () => {
  let component: QuotationdetailsComponent;
  let fixture: ComponentFixture<QuotationdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
