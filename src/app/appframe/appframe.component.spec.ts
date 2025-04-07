import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppframeComponent } from './appframe.component';

describe('AppframeComponent', () => {
  let component: AppframeComponent;
  let fixture: ComponentFixture<AppframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppframeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
