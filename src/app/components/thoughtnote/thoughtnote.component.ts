import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ThoughtNote } from '../../model/thoughtnote';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {HighlightColor, HighlightedDirective} from '../../directives/highlighted.directive';
import {MatCheckbox} from '@angular/material/checkbox';
import {MoodToEmojiPipe} from '../../pipes/mood-to-emoji.pipe';

@Component({
  selector: 'app-thoughtnote',
  imports: [CommonModule, MatIconModule, HighlightedDirective, MatCheckbox, MoodToEmojiPipe],
  templateUrl: './thoughtnote.component.html',
  standalone: true,
  styleUrl: './thoughtnote.component.scss'
})
export class ThoughtnoteComponent {

  isSelected: boolean = false;

  @Input()
  highlightWith!: HighlightColor;

  @Input({ required: true })
  thoughtnote!: ThoughtNote;

  @Output()
  selectedThoughtnoteIdEmitter: EventEmitter<any> = new EventEmitter();

  doOnThoughtnoteSelected() {
    console.log('doOnThoughtnoteSelected =>'+this.isSelected);
      this.selectedThoughtnoteIdEmitter.emit({
        'uuid':this.thoughtnote.UUID,
        'selected':this.isSelected
      });
  }

  addToFavourites(value: string): void {
    // FIXME this is just a test of clipboard
    navigator.clipboard.writeText(value).then(() => {
      console.log('Copied:', value);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

}
