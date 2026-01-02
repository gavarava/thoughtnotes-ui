import {Component, computed, Input, OnInit, signal} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ThoughtnoteComponent} from '../thoughtnote/thoughtnote.component';
import {CommonModule} from '@angular/common';
import {FocusHeaderComponent} from '../focus-header/focus-header.component';
import {Observable, of} from 'rxjs';
import {ThoughtNote} from '../../model/thoughtnote';
import {FocusContext} from '../../model/focus-context';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ThoughtnotesService} from '../../services/thoughtnotes.service';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'thoughtnotes-dashboard',
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    ThoughtnoteComponent,
    CommonModule,
    FocusHeaderComponent, RouterLink, RouterLinkActive, MatTooltip],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private thoughtNotesService: ThoughtnotesService) {
  }

  contextSignal = signal<FocusContext | undefined>(undefined);

  selectedThoughtNotes = signal<Array<any>>([]);
  hasSelectedNotes = computed(() => this.selectedThoughtNotes().length > 0);

  @Input({ required: true })
  dataRange: string | undefined;

  @Input({ required: true })
  thoughtNotes!: ThoughtNote[];

  @Input({ required: true })
  set context(value: any) {
    console.log("Setting context in DashboardComponent");
    if (value === undefined) {
      throw new Error('FocusContext cannot be undefined');
    }
    this.contextSignal.set(value);
  }

  isSideOpen = true;

  onSideNavToggled() {
    this.isSideOpen = !this.isSideOpen;
  }

  onThoughtnoteSelected(event: any) {
    console.log('ThoughtnoteSelected', event);
    if (event.selected) {
    this.selectedThoughtNotes.update(value => value.concat(event.uuid));
    } else {
      this.selectedThoughtNotes.update(value => value.filter(uuid => uuid !== event.uuid));
    }
    console.log('Updated array -', this.selectedThoughtNotes());
  }

  deleteSelectedNotes() {
    const notesToDelete = this.selectedThoughtNotes();
    console.log('Deleting notes:', notesToDelete);
    if (notesToDelete.length > 0) {
      notesToDelete.forEach((selectedNoteId: any) => {
        this.thoughtNotesService.deleteThoughtNote(selectedNoteId).subscribe();
      })
    }
    this.selectedThoughtNotes.set([]);
  }

  exportSelectedNotes() {
    const selectedIds = this.selectedThoughtNotes();
    if (selectedIds.length === 0) {
      console.log('No notes selected for export');
      return;
    }

    const notesToExport = this.thoughtNotes.filter(note => selectedIds.includes(note.UUID));
    const jsonString = JSON.stringify(notesToExport, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `thoughtnotes_export_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();

    window.URL.revokeObjectURL(url);
  }

  thoughtnotesList$!: Observable<ThoughtNote[]>;

  ngOnInit(): void {
    this.thoughtnotesList$ = of(this.thoughtNotes);
    this.thoughtNotesService.refreshNeeded$.subscribe(() => {
       // We need to reload the data. Since the data is passed as input,
       // we might need to trigger a reload in the parent or handle it here if we change strategy.
       // However, since this component receives data via Input, the parent (TimeBasedViewsComponent)
       // is responsible for fetching data.
       // BUT, the service now has a refreshNeeded subject.
       // Let's see how TimeBasedViewsComponent handles data.
    });
  }
}
