export interface FilterCriteria {
  category?: string;
  tag?: string;
  mood?: string;
}

export interface SortOptions {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export type TimeZoomLevel = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface DataResult<T> {
  data: T; // Replace 'any' with a more specific type
  // Add metadata (e.g., totalCount for pagination) if needed
}
