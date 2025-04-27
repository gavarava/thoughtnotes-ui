import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { DayNote } from './daynote';
import {initDayNotesFromJson} from './init';

// Initialize express app
const app = express();
const PORT = 9000;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory database
let dayNotes: DayNote[] = initDayNotesFromJson('./data.json');

// GET all day notes
app.get('/api/daynotes', (req: Request, res: Response) => {
  res.status(200).json(dayNotes);
});

// POST create a new day note
app.post('/api/daynotes', (req: Request, res: Response) => {
  const newNote: DayNote = req.body;

  // Generate UUID if not provided
  if (!newNote.UUID) {
    newNote.UUID = uuidv4();
  }

  // Set timestamp to current time if not provided
  if (!newNote.timestamp) {
    newNote.timestamp = Date.now();
  }

  dayNotes.push(newNote);
  res.status(201).json(newNote);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
