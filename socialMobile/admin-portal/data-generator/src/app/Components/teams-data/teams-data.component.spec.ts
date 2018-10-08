import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsDataComponent } from './teams-data.component';

describe('TeamsDataComponent', () => {
  let component: TeamsDataComponent;
  let fixture: ComponentFixture<TeamsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
