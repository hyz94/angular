import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSetComponent } from './user-set.component';

describe('UserSetComponent', () => {
  let component: UserSetComponent;
  let fixture: ComponentFixture<UserSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
