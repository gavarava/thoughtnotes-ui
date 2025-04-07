import { Component } from '@angular/core';
import { DAYNOTESLIST } from '../db-data';
import { AppframeComponent } from "./appframe/appframe.component";

@Component({
  selector: 'app-root',
  imports: [AppframeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'thoughtnotes-ui';
  dayNotesList = DAYNOTESLIST;
}
