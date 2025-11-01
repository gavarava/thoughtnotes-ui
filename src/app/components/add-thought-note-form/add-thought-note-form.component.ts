import {Component, Input} from '@angular/core';
import {ThoughtNote} from '../../model/thoughtnote';
import {FormsModule, NgForm} from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
import {ActivatedRoute, Router} from "@angular/router";
import {FocusContext} from '../../model/focus-context';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatOption, MatSelect} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {ThoughtnotesService} from '../../services/thoughtnotes.service';

@Component({
  selector: 'app-thoughtnote-form',
  templateUrl: './app-thoughtnote-form.component.html',
  styleUrls: ['./app-thoughtnote-form.component.scss'],
  imports: [FormsModule, MatFormField, MatDatepickerToggle, MatDatepicker, MatDatepickerInput, MatLabel, MatSelect, MatOption, MatInput, MatDialogContent, MatDialogTitle, MatDialogActions, MatButton, MatButton],
  providers: [
    provideNativeDateAdapter()
  ],
})
export class AddThoughtNoteFormComponent {

  constructor(private thoughtnotesService: ThoughtnotesService, private router: Router) {
  }

  // TODO: Replace with values from a service
  tags = ['Meeting', 'Health', 'Finance', 'Workout', 'Project', 'Family', 'Groceries', 'Learning', 'Home', 'Reading', 'Admin', 'Social', 'Coding', 'Travel', 'Other'];
  categories = ['Personal', 'Work', 'Health', 'Finance', 'Education', 'Social', 'Other'];
  moods = ['Happy', 'Sad', 'Neutral', 'Excited', 'Anxious', 'Angry', 'Relaxed', 'Bored', 'Stressed', 'Content', 'todo', 'done'];

  thoughtNote: ThoughtNote = {
    UUID: uuidv4(),
    timestamp: Date.now(),
    category: '',
    tag: '',
    title: '',
    description: '',
    date: new Date().toISOString().substring(0, 10),
    mood: ''
  };

  @Input({required: true})
  context: FocusContext | undefined;

  isSideOpen = true;
  isVisible = false;

  ngOnInit() {
    console.log("Dialog visibility: " + this.isVisible);
  }

  onSideNavToggled() {
    this.isSideOpen = !this.isSideOpen;
  }

  private navigateToHome() {
    this.router.navigate(['/']).then(() => {
      console.log("Navigated to home");
    });
  }


  onSubmit(form: NgForm) {
    console.log("Invoked onSubmit")
    this.thoughtnotesService
      .saveThoughtNote(this.thoughtNote)
      .subscribe({
        next: (data) => {
          console.log("Thought Note saved successfully", data);
          this.isVisible = false;
          form.resetForm();
          this.navigateToHome();
        },
        error: (error) => {
          console.error("Error saving Thought Note", error);
          // Here you can add user-facing error handling, e.g., show a message in the UI
        }
      });
  }

  onReset(form: NgForm) {
    form.resetForm();
    this.thoughtNote = {
      UUID: uuidv4(),
      timestamp: Date.now(),
      category: '',
      tag: '',
      title: '',
      description: '',
      date: new Date().toISOString().substring(0, 10),
      mood: ''
    };
    console.log("Invoked Reset");
  }

  onCancel(form: NgForm) {
    console.log("Invoked Cancel");
    this.isVisible = false;
    form.resetForm();
    this.navigateToHome();
  }
}
