import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline.component';

export const routes: Routes = [
  { path: 'timeline', component: TimelineComponent },
  { path: 'category', component: TimelineComponent },
  { path: 'tag', component: TimelineComponent },
  { path: '', redirectTo: '/timeline', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
