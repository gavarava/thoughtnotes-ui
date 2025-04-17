import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusHeaderComponent } from './focus-header.component';

describe('FocusHeaderComponent', () => {
  let component: FocusHeaderComponent;
  let fixture: ComponentFixture<FocusHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FocusHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
