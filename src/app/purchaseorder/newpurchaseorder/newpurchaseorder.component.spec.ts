import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpurchaseorderComponent } from './newpurchaseorder.component';

describe('NewpurchaseorderComponent', () => {
  let component: NewpurchaseorderComponent;
  let fixture: ComponentFixture<NewpurchaseorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpurchaseorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpurchaseorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
