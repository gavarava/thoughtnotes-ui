import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBasedViewsComponent } from './time-based-views.component';

describe('TimeBasedDashboardViewsComponent', () => {
  let component: TimeBasedViewsComponent;
  let fixture: ComponentFixture<TimeBasedViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeBasedViewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeBasedViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
