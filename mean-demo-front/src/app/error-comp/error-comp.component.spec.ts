import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCompComponent } from './error-comp.component';

describe('ErrorCompComponent', () => {
  let component: ErrorCompComponent;
  let fixture: ComponentFixture<ErrorCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
