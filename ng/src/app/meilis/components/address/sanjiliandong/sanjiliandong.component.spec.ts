import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanjiliandongComponent } from './sanjiliandong.component';

describe('SanjiliandongComponent', () => {
  let component: SanjiliandongComponent;
  let fixture: ComponentFixture<SanjiliandongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanjiliandongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanjiliandongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
