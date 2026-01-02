import {DataResult, FilterCriteria, SortOptions, TimeZoomLevel} from './data.model';
import {Observable} from 'rxjs';

export interface DataRepositoryPort<T> {
  getData(filterCriteria: FilterCriteria, sortOptions: SortOptions, timeZoomLevel: TimeZoomLevel): Observable<DataResult<T[]>>;
  saveData(data: T): Observable<T>;
  deleteData(id: string): Observable<void>;
}
