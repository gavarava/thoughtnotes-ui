// src/app/timeline/timeline.component.ts
import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ThoughtNote } from '../../model/thoughtnote';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-timeline',
  template: `<div *ngFor="let note of filteredNotes">{{ note.title }} - {{ note.date }}</div>`,
  imports: [CommonModule]
})
export class TimelineComponent implements OnInit {
  thoughtNotes: ThoughtNote[] = [];
  filteredNotes: ThoughtNote[] = [];

  constructor(private stateService: StateService) {}

  ngOnInit() {
    this.thoughtNotes = this.stateService.getThoughtNotes();
    const filters = this.stateService.getFilters();
    this.filteredNotes = this.thoughtNotes.filter(
      (note) =>
        (!filters.category || note.category === filters.category) &&
        (!filters.tag || note.tag === filters.tag)
    );
  }
}
