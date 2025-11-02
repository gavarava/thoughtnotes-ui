import express, {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';
import {DayNote} from './daynote';
import {initDayNotesFromJson} from './init';
import {DataResult, FilterCriteria, SortOptions, TimeZoomLevel} from './data/data.model';

// Initialize express app
const app = express();
const PORT = 9000;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory database
let dayNotes: DayNote[] = initDayNotesFromJson('./data.json');

function extractDateString(date: String, parts: Array<'year' | 'month' | 'day'>): string {
  console.log(date);
  const iso = date.split('T')[0]; // "YYYY-MM-DD"
  const [year, month, day] = iso.split('-');
  const map = { year, month, day };
  return parts.map(part => map[part]).join('-');
}

function fetchData(
  filterCriteria: FilterCriteria,
  sortOptions: SortOptions,
  timeZoomLevel: TimeZoomLevel
): Promise<DayNote[]> {
  return new Promise((resolve) => {
    // 1. Simulate fetching data (replace with your actual data fetching logic)
    let data: DayNote[] = dayNotes;

    // 2. Apply filtering
    if (filterCriteria.category && filterCriteria.category !== '*') {
      data = data.filter(item => {
        console.debug('item --> ' + JSON.stringify(item.category));
        return item.category.toLowerCase() === filterCriteria.category?.toLowerCase();
      });
    }

    // 3. Apply sorting
    if (sortOptions.sortBy) {
      const sortFactor = sortOptions.sortOrder === 'desc' ? -1 : 1;
      data.sort((a, b) => {
        const valueA = a[sortOptions.sortBy as keyof DayNote]; // Access property by key
        const valueB = b[sortOptions.sortBy as keyof DayNote];

        if (valueA < valueB) {
          return -1 * sortFactor;
        }
        if (valueA > valueB) {
          return 1 * sortFactor;
        }
        return 0;
      });
    }

    // 4. Apply time zoom
    let zoomedData: DayNote[] = [];
    if (timeZoomLevel === 'monthly') {
      let monthString = extractDateString(new Date().toISOString(), ['year', 'month']); // e\.g\., "2023-10"
      zoomedData = data.filter(value => {
        console.log("value" + JSON.stringify(value));
        let checkvale = value.dueDate;
        console.log("checkvale" + checkvale);
        let extd = extractDateString(checkvale, ['year', 'month']);
        console.log("extd="+extd);
        return extd === monthString;
      });
    } else if (timeZoomLevel === 'daily') {
      let dateString = new Date().toISOString().split('T')[0];
      zoomedData = data.filter(value => value.dueDate === dateString);
    } else if (timeZoomLevel === 'weekly') {
      const today = new Date();
      const lastWeek = getDateFromOneWeekAgo(today);
      zoomedData = data.filter(value => ((new Date(value.dueDate) >= lastWeek) && (new Date(value.dueDate) <= today)));
    }
    // In a real application, you would aggregate the data based on the timeZoomLevel
    // For example, if timeZoomLevel is 'monthly', you would group the data by month
    // and calculate the sum/average/etc. for each month.

    // 5. Return the result
    const result: DataResult<DayNote[]> = { data: zoomedData };
    resolve(result.data);
  });
}

function getDateFromOneWeekAgo(date: Date) {
  const today = new Date(date);
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
}

// GET all day notes
app.get('/api/daynotes', async (req: Request, res: Response) => {
  try {
    console.debug("Fetching data...");
    // 1. Extract query parameters
    const category = req.query.category as string;
    const sortBy = req.query.sortBy as string;
    const sortOrder = req.query.sortOrder as 'asc' | 'desc' || 'asc';  // Default sort order
    const timeZoom = req.query.timeZoom as TimeZoomLevel || 'daily';    // Default time zoom


    // 2. Construct filter and sort options
    const filterCriteria: FilterCriteria = {
      category: category,
    };
    const sortOptions: SortOptions = {
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    // 3. Fetch and process the data
    const result = await fetchData(filterCriteria, sortOptions, timeZoom);

    // 4. Send the response
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
