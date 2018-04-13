import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoucangComponent } from './shoucang.component';

describe('ShoucangComponent', () => {
  let component: ShoucangComponent;
  let fixture: ComponentFixture<ShoucangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoucangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoucangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
