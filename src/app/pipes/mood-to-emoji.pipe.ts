import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moodToEmoji',
  standalone: true
})
export class MoodToEmojiPipe implements PipeTransform {

  private moodEmojis: { [key: string]: string } = {
    'Happy': '😊',
    'Sad': '😢',
    'Neutral': '😐',
    'Excited': '🤩',
    'Anxious': '😰',
    'Angry': '😡',
    'Relaxed': '😌',
    'Bored': '🥱',
    'Stressed': '😫',
    'Content': '🙂',
    'todo': '📝',
    'done': '✅'
  };

  transform(value: string): string {
    // Returns the emoji if found, otherwise returns the original text (or empty string if value is null/undefined)
    if (!value) return '';
    return this.moodEmojis[value] || '❓';
  }

}
