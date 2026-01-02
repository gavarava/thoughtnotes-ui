import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
import {Router} from '@angular/router';
import {FocusContext} from '../../model/focus-context';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ThoughtnotesService} from '../../services/thoughtnotes.service';

// Angular Material Modules
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {JsonPipe} from '@angular/common';
import {MoodSelectorComponent} from '../mood-selector/mood-selector.component';

@Component({
  selector: 'app-thoughtnote-form-rx',
  templateUrl: './add-thought-note-form-rx.component.html',
  styleUrls: ['./add-thought-note-form-rx.component.scss'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatButtonModule, MatDialogModule, ReactiveFormsModule, JsonPipe, MoodSelectorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter()
  ],
  standalone: true
})
export class AddThoughtNoteFormRxComponent {

  constructor(private thoughtnotesService: ThoughtnotesService, private router: Router) {
  }

  // TODO: Replace with values from a service
  tags = ['Meeting', 'Health', 'Finance', 'Workout', 'Project', 'Family', 'Groceries', 'Learning', 'Home', 'Reading', 'Admin', 'Social', 'Coding', 'Travel', 'Other'];
  categories = ['Personal', 'Work', 'Health', 'Finance', 'Education', 'Social', 'Other'];
  moods = ['Happy', 'Sad', 'Neutral', 'Excited', 'Anxious', 'Angry', 'Relaxed', 'Bored', 'Stressed', 'Content', 'todo', 'done'];

  title: FormControl = new FormControl('', [Validators.required]);
  category: FormControl = new FormControl('', [Validators.required]);

  tag: FormControl = new FormControl('', [Validators.required]);
  date: FormControl = new FormControl('', [Validators.required]);

  mood: FormControl = new FormControl('', []);
  description: FormControl = new FormControl('', []);

  addThoughtNoteForm: FormGroup = new FormGroup({
    title: this.title,
    category: this.category,
    tag: this.tag,
    date: this.date,
    mood: this.mood,
    description: this.description
  });

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


  onSubmit() {
    console.log("Invoked onSubmit")
    this.thoughtnotesService
      .saveThoughtNote({
        UUID: uuidv4(),
        timestamp: Date.now(),
        category: this.category.value,
        tag: this.tag.value,
        title: this.title.value,
        description: this.description.value,
        dueDate: this.date.value,
        mood: this.mood.value
      })
      .subscribe({
        next: (data) => {
          console.log("Thought Note saved successfully", data);
          this.isVisible = false;
          this.addThoughtNoteForm.reset();
          this.navigateToHome();
        },
        error: (error) => {
          console.error("Error saving Thought Note", error);
          // Here you can add user-facing error handling, e.g., show a message in the UI
        }
      });
  }

  onReset() {
    this.addThoughtNoteForm.reset();
    console.log("Invoked Reset");
  }

  onCancel() {
    console.log("Invoked Cancel");
    this.isVisible = false;
    this.addThoughtNoteForm.reset();
    this.navigateToHome();
  }
}
