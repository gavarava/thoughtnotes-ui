import { Routes } from "@angular/router";
import {TimeBasedViewsComponent} from "./components/time-based-views/time-based-views.component";
import {AddThoughtNoteFormComponent} from './components/add-thought-note-form/add-thought-note-form.component';
import {AddThoughtNoteFormRxComponent} from './components/add-thought-note-form-rx/add-thought-note-form-rx.component';

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
  {
    path: "add/thoughtnote/rx",
    component: AddThoughtNoteFormRxComponent
  },
  // { Order of Routing Configuration is important
  //   path: "**",
  //   component: PageNotFoundComponent
  // },
];
