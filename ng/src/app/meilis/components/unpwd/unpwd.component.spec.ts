import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpwdComponent } from './unpwd.component';

describe('UnpwdComponent', () => {
  let component: UnpwdComponent;
  let fixture: ComponentFixture<UnpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
