import {Injectable} from '@angular/core';
import {THOUGHTNOTESLIST} from './data/db-data';
import {THOUGHNOTESCATEGORIES} from './data/db-data';
import {ThoughtNote} from '../model/thoughtnote';

interface FilterSettings {
  category: string | null;
  tag?: string;
  dateTimeRange?: string;
}

@Injectable({providedIn: 'root'})
export class StateService {
  private activeTab = 'timeline';
  private filters: FilterSettings = {category: THOUGHNOTESCATEGORIES};

  // State management
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getActiveTab(): string {
    return this.activeTab;
  }

  setFilters(filters: FilterSettings) {
    this.filters = filters;
  }

  getFilters(): FilterSettings {
    return this.filters;
  }

  // Data access
  getThoughtNotes(): ThoughtNote[] {
    return THOUGHTNOTESLIST; // Replace this with API call later
  }

  applyFilters(notes: ThoughtNote[], filters: FilterSettings): ThoughtNote[] {
    let filtered = [...notes];
    if (filters.category) {
      filtered = filtered.filter((note) => note.category === filters.category);
    }
    if (filters.tag) {
      filtered = filtered.filter((note) => note.tag === filters.tag);
    }
    return filtered;
  }
}
