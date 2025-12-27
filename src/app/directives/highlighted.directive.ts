import { Directive, HostBinding, Input } from '@angular/core';

export type HighlightColor = 'red' | 'yellow' | 'green' | '';

@Directive({
  selector: '[highlighted]',
  standalone: true
})
export class HighlightedDirective {

  private _color: HighlightColor = '';

  @Input('highlighted')
  set color(value: HighlightColor) {
    this._color = value || '';
  }

  @HostBinding('class')
  get elementClass(): string {
    if (this._color === '') {
      return '';
    }
    return this._color ? `highlight-${this._color}` : '';
  }
}
