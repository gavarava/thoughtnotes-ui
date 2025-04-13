import { Component, Input } from '@angular/core';
import { DayNote } from '../model/daynote';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-daynote',
  imports: [CommonModule, MatIconModule],
  templateUrl: './daynote.component.html',
  styleUrl: './daynote.component.scss'
})
export class DaynoteComponent {

  @Input({ required: true })
  daynote!: DayNote;

  addToFavourites(value: string): void {
    navigator.clipboard.writeText(value).then(() => {
      console.log('Copied:', value);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
  
}
