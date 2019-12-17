import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Settings } from 'src/models/settings.model';


const API_URL = `${environment.API_URL}/settings`;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getByUserId(userId) {
    return this.http.get<Settings>(`${API_URL}/${userId}`).toPromise();
  }

  save(settings: Settings) {
    if (settings._id) {
      return this.http.put(`${API_URL}/${settings._id}`, settings).toPromise();
    } else {
      return this.http.post(`${API_URL}`, settings).toPromise();
    }
  }
}
