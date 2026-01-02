import { Injectable } from '@angular/core';
import { DataRepositoryPort } from './data-repository.port';
import { ThoughtNote } from '../../model/thoughtnote';
import { DataResult, FilterCriteria, SortOptions, TimeZoomLevel } from './data.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageAdapter implements DataRepositoryPort<ThoughtNote> {

  private readonly STORAGE_KEY = 'thoughtnotes_data';

  constructor() { }

  getData(filterCriteria: FilterCriteria, sortOptions: SortOptions, timeZoomLevel: TimeZoomLevel): Observable<DataResult<ThoughtNote[]>> {
    const data = this.loadFromStorage();
    let filteredData = data;

    // Apply filtering
    if (filterCriteria.category && filterCriteria.category !== '*') {
      filteredData = filteredData.filter(note => note.category === filterCriteria.category);
    }
    if (filterCriteria.tag && filterCriteria.tag !== '*') {
      filteredData = filteredData.filter(note => note.tag === filterCriteria.tag);
    }
    if (filterCriteria.mood && filterCriteria.mood !== '*') {
      filteredData = filteredData.filter(note => note.mood === filterCriteria.mood);
    }

    // Apply sorting
    if (sortOptions.sortBy) {
      filteredData.sort((a, b) => {
        const valA = a[sortOptions.sortBy as keyof ThoughtNote];
        const valB = b[sortOptions.sortBy as keyof ThoughtNote];

        if (valA < valB) return sortOptions.sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOptions.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Note: TimeZoomLevel filtering is not fully implemented in this basic adapter,
    // but could be added by filtering on the timestamp.

    return of({ data: filteredData });
  }

  saveData(data: ThoughtNote): Observable<ThoughtNote> {
    const currentData = this.loadFromStorage();
    // Check if update or new
    const index = currentData.findIndex(note => note.UUID === data.UUID);
    if (index >= 0) {
      currentData[index] = data;
    } else {
      currentData.push(data);
    }
    this.saveToStorage(currentData);
    return of(data);
  }

  deleteData(id: string): Observable<void> {
    let currentData = this.loadFromStorage();
    currentData = currentData.filter(note => note.UUID !== id);
    this.saveToStorage(currentData);
    return of(void 0);
  }

  private loadFromStorage(): ThoughtNote[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(data: ThoughtNote[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }
}
