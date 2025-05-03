import {Component, Injectable, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DayNote} from '../model/daynote';
import {DaynoteComponent} from '../components/daynote/daynote.component';
import {AsyncPipe, CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiDataAdapter} from './data/api.adapter';

@Injectable({
  providedIn: 'root'
})
export class DaynotesService {

  constructor(private apiAdapter: ApiDataAdapter) {
  }

  // TODO: Apply Settings to sort and group by
  loadDayNotes(sortParam='timestamp', sortDirection: 'asc' | 'desc' = 'asc'): Observable<DayNote[]> {
    return this.apiAdapter.getData({category: '*'}, {sortBy: sortParam, sortOrder: sortDirection}, 'daily')
      .pipe(
        map(response => {
          // Extract the data
          let notes: DayNote[] = [];
          if (response && response.data && Array.isArray(response.data)) {
            notes = response.data;
          } else if (response && typeof response === 'object') {
            notes = Object.values(response);
          }
          // Sort the data if sortParam is provided
          if (sortParam) {
            this.sort(notes, sortParam, sortDirection);
          }

          return notes;
        })
      );
  }

  private sort(notes: DayNote[], sortParam: string, sortDirection: "asc" | "desc") {
    notes.sort((a, b) => {
      const valueA = a[sortParam as keyof DayNote];
      const valueB = b[sortParam as keyof DayNote];

      // Handle different data types for comparison
      if (sortDirection === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
  }
}
