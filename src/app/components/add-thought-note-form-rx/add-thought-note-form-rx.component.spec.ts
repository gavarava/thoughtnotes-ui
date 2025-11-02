import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThoughtNoteFormRxComponent } from './add-thought-note-form-rx.component';

describe('AddThoughtNoteFormRxComponent', () => {
  let component: AddThoughtNoteFormRxComponent;
  let fixture: ComponentFixture<AddThoughtNoteFormRxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddThoughtNoteFormRxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddThoughtNoteFormRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
