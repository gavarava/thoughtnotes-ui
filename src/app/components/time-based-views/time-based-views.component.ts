import {Component, Input, OnInit} from "@angular/core";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {THOUGHTNOTESLIST} from "../../services/data/db-data";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-time-based-views",
  imports: [
    DashboardComponent
  ],
  templateUrl: "./time-based-views.component.html",
  styleUrl: "./time-based-views.component.scss"
})
export class TimeBasedViewsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  @Input()
  dataRange: string | undefined = "week";

  ngOnInit() {
    this.dataRange = this.route.snapshot.params['dataRange'];
    console.log(this.dataRange);
    // Observable to subscribe to updates --> this.route.snapshot.queryParams
    console.log("queryParamMap ==> " + this.route.snapshot.queryParamMap);

    // Send dataRange to the API using a service and get list to display
  }

  protected readonly THOUGHTNOTESLIST = THOUGHTNOTESLIST;
}
