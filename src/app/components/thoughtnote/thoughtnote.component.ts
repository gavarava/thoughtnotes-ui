import { Component, Input } from '@angular/core';
import { ThoughtNote } from '../../model/thoughtnote';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {HighlightColor, HighlightedDirective} from '../../directives/highlighted.directive';

@Component({
  selector: 'app-thoughtnote',
  imports: [CommonModule, MatIconModule, HighlightedDirective],
  templateUrl: './thoughtnote.component.html',
  standalone: true,
  styleUrl: './thoughtnote.component.scss'
})
export class ThoughtnoteComponent {

  @Input()
  highlightWith!: HighlightColor;

  @Input({ required: true })
  thoughtnote!: ThoughtNote;

  addToFavourites(value: string): void {
    // FIXME this is just a test of clipboard
    navigator.clipboard.writeText(value).then(() => {
      console.log('Copied:', value);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

}
