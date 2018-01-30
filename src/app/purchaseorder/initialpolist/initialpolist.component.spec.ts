import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialpolistComponent } from './initialpolist.component';

describe('InitialpolistComponent', () => {
  let component: InitialpolistComponent;
  let fixture: ComponentFixture<InitialpolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialpolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialpolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
