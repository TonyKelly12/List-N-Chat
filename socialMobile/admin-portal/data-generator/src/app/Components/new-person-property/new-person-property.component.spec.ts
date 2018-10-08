import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPersonPropertyComponent } from './new-person-property.component';

describe('NewPersonPropertyComponent', () => {
  let component: NewPersonPropertyComponent;
  let fixture: ComponentFixture<NewPersonPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPersonPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPersonPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
