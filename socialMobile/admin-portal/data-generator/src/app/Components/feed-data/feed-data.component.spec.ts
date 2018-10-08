import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedDataComponent } from './feed-data.component';

describe('FeedDataComponent', () => {
  let component: FeedDataComponent;
  let fixture: ComponentFixture<FeedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
