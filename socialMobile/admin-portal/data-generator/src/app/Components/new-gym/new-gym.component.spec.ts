import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGymComponent } from './new-gym.component';

describe('NewGymComponent', () => {
  let component: NewGymComponent;
  let fixture: ComponentFixture<NewGymComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGymComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
