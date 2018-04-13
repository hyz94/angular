import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShezhiComponent } from './shezhi.component';

describe('ShezhiComponent', () => {
  let component: ShezhiComponent;
  let fixture: ComponentFixture<ShezhiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShezhiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShezhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
