import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsalesmanComponent } from './newsalesman.component';

describe('NewsalesmanComponent', () => {
  let component: NewsalesmanComponent;
  let fixture: ComponentFixture<NewsalesmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsalesmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsalesmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
