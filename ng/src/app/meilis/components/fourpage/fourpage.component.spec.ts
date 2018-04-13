import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourpageComponent } from './fourpage.component';

describe('FourpageComponent', () => {
  let component: FourpageComponent;
  let fixture: ComponentFixture<FourpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
