import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotObservableSubjectComponent } from './hot-observable-subject.component';

describe('HotObservableSubjectComponent', () => {
  let component: HotObservableSubjectComponent;
  let fixture: ComponentFixture<HotObservableSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotObservableSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotObservableSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
