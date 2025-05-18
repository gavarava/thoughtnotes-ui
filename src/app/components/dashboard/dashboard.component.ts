import {Component, Input, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ThoughtnoteComponent} from '../thoughtnote/thoughtnote.component';
import {AsyncPipe, CommonModule} from '@angular/common';
import {FocusHeaderComponent} from '../focus-header/focus-header.component';
import {map, Observable} from 'rxjs';
import {ThoughtNote} from '../../model/thoughtnote';
import {FocusContext} from '../../model/focus-context';
import {ThoughtnotesService} from '../../services/thoughtnotes.service';

@Component({
  selector: 'thoughtnotes-dashboard',
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    ThoughtnoteComponent,
    CommonModule,
    AsyncPipe,
    FocusHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  @Input({ required: true })
  thoughtNotes!: ThoughtNote[]

  isSideOpen = false;

  onMenuClick() {
    this.isSideOpen = !this.isSideOpen;
  }

  thoughtnotesList$!: Observable<ThoughtNote[]>;
  context!: FocusContext;

  ngOnInit(): void {
    this.thoughtnotesList$ = this.thoughtnotesService.loadThoughtNotes('*','*', 'done','timestamp', 'desc');
    // Ideal to setup a service to gather the context
    this.context = {
      numberOfNotesInFocus$: this.thoughtnotesList$.pipe(map(notes => notes.length)),
      focusScopeInDays: 30
    };
  }

  constructor(private thoughtnotesService: ThoughtnotesService) {}
}
