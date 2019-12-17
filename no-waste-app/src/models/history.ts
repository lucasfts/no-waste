import { Settings } from './settings.model';
import { Meal } from './meal';
import { HistoryEvent } from './history-event';

export interface History {
  _id: string;
  settings: Settings;
  date: Date;
  hour: string;
  wheater: string;
  meals: Meal[];
  events: HistoryEvent[];
}
