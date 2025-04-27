import fs from 'fs';
import path from 'path';
import { DayNote } from './daynote';

/**
 * Initializes the DayNotes in-memory database from a static JSON file
 * @param filePath Path to the JSON file containing DayNote data
 * @returns Array of DayNote objects
 */
export function initDayNotesFromJson(filePath: string): DayNote[] {
  try {
    // Read the file synchronously
    const jsonData = fs.readFileSync(path.resolve(filePath), 'utf8');

    // Parse the JSON data
    const data = JSON.parse(jsonData);

    // Handle both array and single object formats
    const notes: DayNote[] = Array.isArray(data) ? data : [data];

    console.log(`Successfully loaded ${notes.length} day notes from ${filePath}`);
    return notes;
  } catch (error) {
    console.error(`Failed to load day notes from ${filePath}:`, error);
    // Return empty array or default data if file cannot be read
    return [];
  }
}
