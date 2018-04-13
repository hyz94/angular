import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoulikeComponent } from './youlike.component';

describe('YoulikeComponent', () => {
  let component: YoulikeComponent;
  let fixture: ComponentFixture<YoulikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoulikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoulikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
