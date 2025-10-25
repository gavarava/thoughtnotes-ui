import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {TimeBasedViewsComponent} from "./components/time-based-views/time-based-views.component";
import {AddThoughtNoteFormComponent} from './components/add-thought-note-form/add-thought-note-form.component';

export const routes: Routes = [
  { path: "", // default path looks like this
     redirectTo: "organizeby/time/daily",
      pathMatch: "full"
  },
  {
    path: "organizeby/time/:dataRange",
     component: TimeBasedViewsComponent
  },
  {
    path: "add/thoughtnote",
    component: AddThoughtNoteFormComponent
  },
  // { Order of Routing Configuration is important
  //   path: "**",
  //   component: PageNotFoundComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
