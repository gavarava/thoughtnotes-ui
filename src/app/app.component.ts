import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DayNote } from './model/daynote';
import { DaynoteComponent } from './components/daynote/daynote.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { DaynotesService } from './services/daynotes.service';
import { FocusHeaderComponent } from "./components/focus-header/focus-header.component";
import { FocusContext } from './model/focus-context';


@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, RouterOutlet, DaynoteComponent, CommonModule, AsyncPipe, FocusHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  dayNotesList$!: Observable<DayNote[]>;
  context!: FocusContext;

  isSideOpen = false;

  constructor(private daynotesService: DaynotesService) {}

  ngOnInit(): void {
    this.dayNotesList$ = this.daynotesService.loadDayNotes('timestamp', 'desc');
    // Ideal to setup a service to gather the context
    this.context = {
      numberOfNotesInFocus$: this.dayNotesList$.pipe(map(notes => notes.length)),
      focusScopeInDays: 30
    };
  }

  onMenuClick() {
    this.isSideOpen = !this.isSideOpen;
  }

}
