// focused-header.component.ts
import {Component, Input, OnInit, signal} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {FocusContext} from '../../model/focus-context';
import {CachedLocationService} from '../../services/cached-location.service';

@Component({
  selector: 'app-focus-header',
  templateUrl: './focus-header.component.html',
  styleUrls: ['./focus-header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, CommonModule, MatIconModule]
})
export class FocusHeaderComponent implements OnInit {

  private readonly ONE_WEEK_MILLISECONDS = 604800000; // 7 * 24 * 60 * 60 * 1000

  currentDate: Date = new Date();
  currentWeek: number = 0;

  private readonly DEFAULT_VALUE = 'Loading...';
  locationSignal = signal(this.DEFAULT_VALUE);

  locationInfo = this.locationSignal.asReadonly();

  @Input() context!: FocusContext | undefined;

  constructor(private locationService: CachedLocationService) {
  }

  ngOnInit(): void {
    // Get the location once when the component loads.
    this.getCurrentWeek();
    this.updateUserLocation();
  }

  getCurrentWeek(): void {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = this.ONE_WEEK_MILLISECONDS;
    this.currentWeek = Math.ceil(diff / oneWeek);
  }

  updateUserLocation(): void {
    this.locationService.getLocation().subscribe((location) => {
      this.locationSignal.set(location);
    });
  }
}
