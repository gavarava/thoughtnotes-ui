import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DaynoteComponent} from '../daynote/daynote.component';
import {AsyncPipe, CommonModule} from '@angular/common';
import {FocusHeaderComponent} from '../focus-header/focus-header.component';
import {map, Observable} from 'rxjs';
import {DayNote} from '../../model/daynote';
import {FocusContext} from '../../model/focus-context';
import {DaynotesService} from '../../services/daynotes.service';

@Component({
  selector: 'thoughtnotes-dashboard',
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    DaynoteComponent,
    CommonModule,
    AsyncPipe,
    FocusHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  dayNotesList$!: Observable<DayNote[]>;
  context!: FocusContext;

  ngOnInit(): void {
    this.dayNotesList$ = this.daynotesService.loadDayNotes('*','*', '*','timestamp', 'desc');
    // Ideal to setup a service to gather the context
    this.context = {
      numberOfNotesInFocus$: this.dayNotesList$.pipe(map(notes => notes.length)),
      focusScopeInDays: 30
    };
  }

  constructor(private daynotesService: DaynotesService) {}
}
