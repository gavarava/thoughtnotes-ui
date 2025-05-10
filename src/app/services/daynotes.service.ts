import {Injectable} from '@angular/core';
import {DayNote} from '../model/daynote';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiDataAdapter} from './data/api.adapter';

@Injectable({
  providedIn: 'root'
})
export class DaynotesService {

  constructor(private apiDataAdapter: ApiDataAdapter) {
  }

  // TODO: Apply Settings to sort and group by
  loadDayNotes(category='*', tag='*', mood='*', sortParam='timestamp', sortDirection: 'asc' | 'desc' = 'asc'): Observable<DayNote[]> {
    return this.apiDataAdapter.getData({category: category, tag:tag, mood:mood}, {sortBy: sortParam, sortOrder: sortDirection}, 'daily')
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
