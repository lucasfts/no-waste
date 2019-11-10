import { Settings } from './settings.model';
import { Meal } from './meal';
import { HistoryEvent } from './history-event';

export interface History {
  settings: Settings;
  date: Date;
  wheater: string;
  meals: Meal[];
  events: HistoryEvent[];
}
