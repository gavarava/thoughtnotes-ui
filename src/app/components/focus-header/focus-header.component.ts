// focused-header.component.ts
import { Component, Input, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FocusContext } from '../../model/focus-context';

@Component({
  selector: 'app-focus-header',
  templateUrl: './focus-header.component.html',
  styleUrls: ['./focus-header.component.scss'],
  imports: [MatToolbarModule, CommonModule, MatIconModule]
})
export class FocusHeaderComponent implements OnInit {
  currentDate: Date = new Date();
  currentWeek: number = 0;
  location: string = 'Loading...';

  @Input()
  context!: FocusContext;

  constructor() {
    // Update time every second
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    this.getCurrentWeek();
    this.getUserLocation();
  }

  private readonly ONE_WEEK_MILLISECONDS = 604800000;

  getCurrentWeek(): void {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = this.ONE_WEEK_MILLISECONDS;
    this.currentWeek = Math.ceil(diff / oneWeek);
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For a real app, you might want to use a service to convert coordinates to a place name
          this.location = `Lat: ${position.coords.latitude.toFixed(2)}, Long: ${position.coords.longitude.toFixed(2)}`;
        },
        () => {
          this.location = 'Location not available';
        }
      );
    } else {
      this.location = 'Geolocation not supported';
    }
  }
}
