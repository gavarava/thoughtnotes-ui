import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaynoteComponent } from './daynote.component';

describe('DaynoteComponent', () => {
  let component: DaynoteComponent;
  let fixture: ComponentFixture<DaynoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaynoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaynoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
