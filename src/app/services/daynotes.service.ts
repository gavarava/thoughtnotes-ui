import { Component, Injectable, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DayNote } from '../model/daynote';
import { DaynoteComponent } from '../components/daynote/daynote.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DaynotesService {

  constructor(private httpClient: HttpClient) { }

  loadDayNotes(): Observable<DayNote[]> {
        return this.httpClient.get<any>("http://localhost:9000/api/daynotes")
      .pipe(
        map(response => {
          // If response has a data property that contains the array
          if (response && response.payload && Array.isArray(response.payload)) {
            return response.payload;
          }
          // If response itself should be an array but isn't
          else if (response && typeof response === 'object') {
            return Object.values(response);
          }
          // Fallback
          return [];
        })
      );
  }
}
