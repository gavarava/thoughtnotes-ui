import { Observable } from "rxjs";

export interface FocusContext {
    numberOfNotesInFocus$: Observable<number>;
    focusScopeInDays: number;
  }