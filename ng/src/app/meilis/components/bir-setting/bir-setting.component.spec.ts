import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirSettingComponent } from './bir-setting.component';

describe('BirSettingComponent', () => {
  let component: BirSettingComponent;
  let fixture: ComponentFixture<BirSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
