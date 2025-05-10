import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';


@Component({
  selector: 'app-root',
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CommonModule,
    RouterOutlet,
    DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  isSideOpen = false;

  onMenuClick() {
    this.isSideOpen = !this.isSideOpen;
  }

}
