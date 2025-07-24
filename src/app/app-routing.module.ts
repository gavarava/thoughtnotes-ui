import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
// Example of Navigation  { path: 'tag', component: TimelineGroupingViewComponent },
  { path: '', redirectTo: '/timeline', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
