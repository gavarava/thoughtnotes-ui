// focused-header.component.ts
import {Component, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FocusContext } from '../../model/focus-context';

@Component({
  selector: 'app-focus-header',
  templateUrl: './focus-header.component.html',
  styleUrls: ['./focus-header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, CommonModule, MatIconModule]
})
export class FocusHeaderComponent implements OnInit, OnDestroy {

  private readonly ONE_WEEK_MILLISECONDS = 604800000; // 7 * 24 * 60 * 60 * 1000

  currentDate: Date = new Date();
  currentWeek: number = 0;
  locationSignal = signal('Loading...');

  locationInfo = this.locationSignal.asReadonly();

  @Input() context!: FocusContext | undefined;

  constructor() {
    // Constructor is best kept simple. We'll initialize in ngOnInit.
  }

  ngOnInit(): void {
    // Get the location once when the component loads.
    this.updateUserLocation();
  }

  ngOnDestroy(): void {
    // Important: Clean up the interval to prevent memory leaks.
  }

  getCurrentWeek(): void {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = this.ONE_WEEK_MILLISECONDS;
    this.currentWeek = Math.ceil(diff / oneWeek);
  }

  updateUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For a real app, you might want to use a service to convert coordinates to a place name
          this.locationSignal.set(`Lat: ${position.coords.latitude.toFixed(2)}, Long: ${position.coords.longitude.toFixed(2)}`);
        },
        () => {
          this.locationSignal.set('Location not available');
        }
      );
    } else {
      this.locationSignal.set( 'Geolocation not supported');
    }
  }
}
