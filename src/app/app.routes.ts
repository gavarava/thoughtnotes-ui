import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", // default path looks like this
     redirectTo: "organizeby/time/daily",
      pathMatch: "full"
  },
  {
    path: "organizeby/time/:dataRange",
     loadComponent: () => import('./components/time-based-views/time-based-views.component').then(m => m.TimeBasedViewsComponent)
  },
  {
    path: "add/thoughtnote",
    loadComponent: () => import('./components/add-thought-note-form/add-thought-note-form.component').then(m => m.AddThoughtNoteFormComponent)
  },
  {
    path: "add/thoughtnote/rx",
    loadComponent: () => import('./components/add-thought-note-form-rx/add-thought-note-form-rx.component').then(m => m.AddThoughtNoteFormRxComponent)
  },
  // { Order of Routing Configuration is important
  //   path: "**",
  //   component: PageNotFoundComponent
  // },
];
