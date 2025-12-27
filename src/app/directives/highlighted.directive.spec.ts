import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightColor, HighlightedDirective } from './highlighted.directive';

// Test Suite 1: For when a value is explicitly bound to the directive
@Component({
  standalone: true,
  imports: [HighlightedDirective],
  template: `<div [highlighted]="color"></div>`
})
class TestBindingComponent {
  color: HighlightColor | '' = 'yellow';
}

// Test Suite 2: For when the directive is used as a simple attribute
@Component({
  standalone: true,
  imports: [HighlightedDirective],
  template: `<div highlighted></div>`
})
class TestAttributeComponent {}

describe('HighlightedDirective (with binding)', () => {
  let fixture: ComponentFixture<TestBindingComponent>;
  let component: TestBindingComponent;
  let element: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBindingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestBindingComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('div'));
    fixture.detectChanges();
  });

  it('should apply "highlight-yellow" class when color is "yellow"', () => {
    component.color = 'yellow';
    fixture.detectChanges();
    expect(element.nativeElement.classList.contains('highlight-yellow')).toBe(true);
  });

  it('should apply "highlight-red" class and remove old class when color changes to "red"', () => {
    component.color = 'yellow';
    fixture.detectChanges();
    expect(element.nativeElement.classList.contains('highlight-yellow')).toBe(true);

    component.color = 'red';
    fixture.detectChanges();
    expect(element.nativeElement.classList.contains('highlight-red')).toBe(true);
    expect(element.nativeElement.classList.contains('highlight-yellow')).toBe(false);
  });

  it('should apply "highlight-green" class when color is "green"', () => {
    component.color = 'green';
    fixture.detectChanges();
    expect(element.nativeElement.classList.contains('highlight-green')).toBe(true);
  });
});

describe('HighlightedDirective (as attribute)', () => {
  let fixture: ComponentFixture<TestAttributeComponent>;
  let element: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAttributeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestAttributeComponent);
    element = fixture.debugElement.query(By.css('div'));
    fixture.detectChanges();
  });

  it('should apply "highlight-yellow" class by default when no value is provided', () => {
    expect(element.nativeElement.classList.contains('highlight-yellow')).toBe(true);
  });
});
