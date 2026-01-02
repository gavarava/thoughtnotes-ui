import {Injectable} from '@angular/core';
import {ThoughtNote} from '../model/thoughtnote';
import {Observable, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {LocalStorageAdapter} from './data/local-storage.adapter';
import {TimeZoomLevel} from './data/data.model';

@Injectable({
  providedIn: 'root'
})
export class ThoughtnotesService {

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$.asObservable();
  }

  constructor(private dataAdapter: LocalStorageAdapter) {
  }

  loadThoughtNotes(category='*', tag='*', mood='*', sortParam='timestamp', sortDirection: 'asc' | 'desc' = 'asc', timeZoomLevel: TimeZoomLevel): Observable<ThoughtNote[]> {
    return this.dataAdapter.getData({category: category, tag:tag, mood:mood}, {sortBy: sortParam, sortOrder: sortDirection}, timeZoomLevel)
      .pipe(
        map(response => {
          // Extract the data
          let notes: ThoughtNote[] = [];
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

  saveThoughtNote(note: ThoughtNote): Observable<ThoughtNote> {
    return this.dataAdapter.saveData(note).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  deleteThoughtNote(thoughtNoteUuid: string): Observable<void> {
    return this.dataAdapter.deleteData(thoughtNoteUuid).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  private sort(notes: ThoughtNote[], sortParam: string, sortDirection: "asc" | "desc") {
    notes.sort((a, b) => {
      const valueA = a[sortParam as keyof ThoughtNote];
      const valueB = b[sortParam as keyof ThoughtNote];

      // Handle different data types for comparison
      if (sortDirection === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
  }
}
