import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CachedLocationService {
  private cache: { value: string, timestamp: number } | null = null;
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

  getLocation(): Observable<string> {
    if (this.isCacheValid()) {
      // Return cached value immediately
      return of(this.cache!.value);
    }

    // Fetch new data
    return new Observable<string>((observer) => {
      if (!navigator.geolocation) {
        observer.next('Geolocation not supported');
        observer.complete();
        return;
      }

      console.log("Locating now!");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `Lat: ${position.coords.latitude.toFixed(2)}, Long: ${position.coords.longitude.toFixed(2)}`;
          this.updateCache(location);
          observer.next(location);
          observer.complete();
        },
        () => {
          observer.next('Location not available');
          observer.complete();
        }
      );
    });
  }

  private isCacheValid(): boolean {
    if (!this.cache) return false;
    return (Date.now() - this.cache.timestamp) < this.CACHE_DURATION;
  }

  private updateCache(value: string): void {
    this.cache = {
      value,
      timestamp: Date.now()
    };
  }
}
