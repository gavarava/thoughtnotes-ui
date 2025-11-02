import { Component, Input } from '@angular/core';
import { ThoughtNote } from '../../model/thoughtnote';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-thoughtnote',
  imports: [CommonModule, MatIconModule],
  templateUrl: './thoughtnote.component.html',
  standalone: true,
  styleUrl: './thoughtnote.component.scss'
})
export class ThoughtnoteComponent {

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
