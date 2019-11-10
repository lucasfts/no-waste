import { State } from './state.model';
import { City } from './city.model';

export interface Settings {
  _id: String;
  averagePeople: Number;
  institution: String;
  state: State;
  city: City;
}
