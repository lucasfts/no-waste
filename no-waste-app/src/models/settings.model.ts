import { State } from './state.model';
import { City } from './city.model';

export interface Settings {
  _id: string;
  averagePeople: number;
  institution: string;
  state: State;
  city: City;
}
