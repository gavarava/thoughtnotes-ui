// src/app/services/data/api.adapter.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataRepositoryPort } from './data-repository.port';
import { DataResult } from './data.model';
import { FilterCriteria, SortOptions, TimeZoomLevel } from './data.model';
import { Observable } from 'rxjs';
import {DayNote} from '../../model/daynote';

@Injectable({
  providedIn: 'root',
})
export class ApiDataAdapter implements DataRepositoryPort<DayNote[]> {
  private apiUrl = "http://localhost:9000/api/daynotes";
  constructor(private http: HttpClient) {}

  getData(
    filterCriteria: FilterCriteria,
    sortOptions: SortOptions,
    timeZoomLevel: TimeZoomLevel
  ): Observable<DataResult<DayNote[]>> {
    const url = this.buildApiUrl(filterCriteria, sortOptions, timeZoomLevel);
    console.log('API Adapter - getData', url);
    return this.http.get<DataResult<DayNote[]>>(url);
  }

  private buildApiUrl(
    filterCriteria: FilterCriteria,
    sortOptions: SortOptions,
    timeZoomLevel: TimeZoomLevel
  ): string {
    let url = `${this.apiUrl}?`; //  base URL
    // Build the query parameters
    if (filterCriteria.dateRange) {
      url += `startDate=${filterCriteria.dateRange.start}&endDate=${filterCriteria.dateRange.end}&`;
    }
    if (filterCriteria.category) {
      url += `category=${filterCriteria.category}&`;
    }
    if (sortOptions.sortBy) {
      url += `sortBy=${sortOptions.sortBy}&sortOrder=${sortOptions.sortOrder}&`
    }
    url += `timeZoom=${timeZoomLevel}`;
    return url;
  }
}
