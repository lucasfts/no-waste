import { State } from './state.model';
import { City } from './city.model';

export interface Settings {
  _id: String;
  userId: String;
  institution: String;
  state: State;
  city: City;
}
