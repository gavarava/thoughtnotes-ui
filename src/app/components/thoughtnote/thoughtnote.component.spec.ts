import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoughtnoteComponent } from './thoughtnote.component';

describe('ThoughtnoteComponent', () => {
  let component: ThoughtnoteComponent;
  let fixture: ComponentFixture<ThoughtnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThoughtnoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThoughtnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
