import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { State } from 'src/models/state.model';
import { City } from 'src/models/city.model';

const IBGE_API = `${environment.IBGE_API}`;
const CLIMATEMPO_API = `${environment.CLIMATEMPO_API}`;
const CLIMATEMPO_TOKEN = `${environment.CLIMATEMPO_TOKEN}`;

@Injectable({
  providedIn: 'root'
})
export class GeoclimaticService {

  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get<State[]>(`${IBGE_API}/localidades/estados`).toPromise();
  }

  getCities(cityId) {
    return this.http.get<City[]>(`${IBGE_API}/localidades/estados/${cityId}/municipios`).toPromise();
  }

  // getWheater(city: string, uf: string){
  //   return this.http.get<{id: number}>(`${CLIMATEMPO_API}/locale/city?name=${city}&state=${uf}&token=${CLIMATEMPO_TOKEN}`).toPromise()
  //   .then(result => {
  //     this.http.get<>(`${CLIMATEMPO_API}/weather/locale/${result.id}/current?token=${CLIMATEMPO_TOKEN}`).toPromise();
  //   });
  // }

}
