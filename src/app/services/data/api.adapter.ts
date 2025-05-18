// src/app/services/data/api.adapter.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataRepositoryPort } from './data-repository.port';
import { DataResult } from './data.model';
import { FilterCriteria, SortOptions, TimeZoomLevel } from './data.model';
import { Observable } from 'rxjs';
import {ThoughtNote} from '../../model/thoughtnote';

@Injectable({
  providedIn: 'root',
})
export class ApiDataAdapter implements DataRepositoryPort<ThoughtNote[]> {
  private apiUrl = "http://localhost:9000/api/thoughtnotes";
  constructor(private http: HttpClient) {}

  getData(
    filterCriteria: FilterCriteria,
    sortOptions: SortOptions,
    timeZoomLevel: TimeZoomLevel
  ): Observable<DataResult<ThoughtNote[]>> {
    const url = this.buildApiUrl(filterCriteria, sortOptions, timeZoomLevel);
    console.log('API Adapter - getData', url);
    return this.http.get<DataResult<ThoughtNote[]>>(url);
  }

  private buildApiUrl(
    filterCriteria: FilterCriteria,
    sortOptions: SortOptions,
    timeZoomLevel: TimeZoomLevel
  ): string {
    let url = `${this.apiUrl}?`; //  base URL
    // Build the query parameters
    // if (filterCriteria.dateRange) {
    //   url += `startDate=${filterCriteria.dateRange.start}&endDate=${filterCriteria.dateRange.end}&`;
    // }
    if (filterCriteria.category) {
      url += `category=${filterCriteria.category}&`;
    }

    if (filterCriteria.category) {
      url += `tag=${filterCriteria.tag}&`;
    }

    if (filterCriteria.category) {
      url += `mood=${filterCriteria.mood}&`;
    }

    if (sortOptions.sortBy) {
      url += `sortBy=${sortOptions.sortBy}&sortOrder=${sortOptions.sortOrder}&`
    }
    // FIXME implementation of time zoom
    url += `timeZoom=${timeZoomLevel}`;
    return url;
  }
}
