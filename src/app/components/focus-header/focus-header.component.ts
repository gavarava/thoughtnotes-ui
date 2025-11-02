// focused-header.component.ts
import {Component, Input, OnInit, Output, signal} from '@angular/core';
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
export class FocusHeaderComponent implements OnInit {
  currentDate: Date = new Date();
  currentWeek: number = 0;
  locationSignal = signal('Loading...');
  locationInfo = this.locationSignal.asReadonly();

  @Input()
  context: FocusContext | undefined;

  constructor() {
    // Update time every second
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    this.getCurrentWeek();
    this.updateUserLocation();
  }

  private readonly ONE_WEEK_MILLISECONDS = 604800000;

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
