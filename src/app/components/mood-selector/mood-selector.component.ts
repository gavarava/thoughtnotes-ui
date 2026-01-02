// D:/development/thoughtnotes-ui/src/app/components/mood-selector/mood-selector.component.ts

import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MoodToEmojiPipe} from '../../pipes/mood-to-emoji.pipe';

@Component({
  selector: 'app-mood-selector',
  standalone: true,
  imports: [CommonModule, MoodToEmojiPipe],
  templateUrl: './mood-selector.component.html',
  styleUrls: ['./mood-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MoodSelectorComponent),
      multi: true
    }
  ]
})
export class MoodSelectorComponent implements ControlValueAccessor {
  @Input() moods: string[] = [];

  value: string = '';
  isDisabled = false;


  // These are placeholders for the callbacks Angular will register
  onChange: (value: string) => void = () => {
  };
  onTouched: () => void = () => {
  };

  // Called by Angular to write a value to the view (e.g. form.setValue('Happy'))
  writeValue(value: string): void {
    this.value = value;
  }

  // Called by Angular to register the function to call when the value changes in the UI
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Called by Angular to register the function to call when the control is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Called by Angular when the control is disabled/enabled
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // UI Interaction
  selectMood(mood: string) {
    if (this.isDisabled) return;

    this.value = mood;
    this.onChange(mood); // Notify Angular form that value changed
    this.onTouched();    // Notify Angular form that control was touched
  }
}
