import {ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {ActivatedRoute} from "@angular/router";
import {ThoughtnotesService} from '../../services/thoughtnotes.service';
import {ThoughtNote} from '../../model/thoughtnote';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FocusContext} from '../../model/focus-context';
import {map} from 'rxjs/operators';

@Component({
  selector: "app-time-based-views",
  imports: [
    DashboardComponent,
    AsyncPipe
  ],
  templateUrl: "./time-based-views.component.html",
  styleUrl: "./time-based-views.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush // TODO: Verify if this works with OnChanges
})
export class TimeBasedViewsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service:ThoughtnotesService) {}

  private readonly ONE_WEEK_MILLISECONDS = 604800000;

  @Input({required:true})
  dataRange: "daily" | "weekly" | "monthly" | "yearly" = "weekly";

  thoughtNotes$: Observable<ThoughtNote[]> | undefined;

  focusContext: FocusContext | undefined;

  currentDate: Date = new Date();
  currentWeek: number = 0;
  location: string = 'Loading...';

  ngOnInit() {
    /**
     * When you navigate to the same component with different route parameters, Angular reuses the component instance by default.
     * This means ngOnInit is not called again, so changes in route parameters are not detected automatically.
     * To handle this, subscribe to ActivatedRoute.params or ActivatedRoute.queryParams in your component.
     * This way, you can react to parameter changes even when the component is reused.
     */
    this.currentWeek = this.getCurrentWeek();
    this.location = this.getUserLocation();

    this.route.params.subscribe(params => {
      // Observable to subscribe to updates --> this.route.snapshot.queryParams
      // Send dataRange to the API using a service and get list to display
      this.dataRange = params['dataRange'];
      console.log("Latest dataRange ->" + this.dataRange);
      this.thoughtNotes$ = this.service.loadThoughtNotes('*', '*', '*', 'timestamp', 'desc', this.dataRange);

      // Set focusContext based on dataRange using a map for cleaner code
      const focusScopeMap: Record<"daily" | "weekly" | "monthly" | "yearly", number> = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365
      };
      const focusScopeInDays = focusScopeMap[this.dataRange] ?? 7;
      this.focusContext = {
        numberOfNotesInFocus$: this.thoughtNotes$.pipe(map(notes => notes.length)),
        focusScopeInDays,
        currentWeek: this.currentWeek,
        currentDate: this.currentDate,
        currentLocation: this.location // Defect with Location should be fixed using Signals
      };
      console.log("this.focusContext ->" + JSON.stringify(this.focusContext));
    });
  }

  getCurrentWeek(): number {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = this.ONE_WEEK_MILLISECONDS;
    return Math.ceil(diff / oneWeek);
  }

  getUserLocation(): string {
    console.log("Getting user location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For a real app, you might want to use a service to convert coordinates to a place name
          return `Lat: ${position.coords.latitude.toFixed(2)}, Long: ${position.coords.longitude.toFixed(2)}`;
        },
        () => {
          return 'Location not available';
        }
      );
    } else {
      return 'Geolocation not supported';
    }
    return 'Loading...';
  }
}
