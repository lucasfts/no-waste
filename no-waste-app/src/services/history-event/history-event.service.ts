import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistoryEvent } from 'src/models/history-event';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

const API_URL = `${environment.API_URL}/events`;

@Injectable({
  providedIn: 'root'
})
export class HistoryEventService {

  private historyEventListener = new Subject<HistoryEvent[]>();

  constructor(private http: HttpClient) { }

  getHistoryEventListener() {
    return this.historyEventListener.asObservable();
  }

  getBySettingsId(settingsId) {
    return this.http.get<HistoryEvent[]>(`${API_URL}/${settingsId}`).toPromise();
  }

  private updateListener(settingsId) {
    this.getBySettingsId(settingsId).then(events => this.historyEventListener.next(events));
  }

  save(historyEvent: HistoryEvent) {
    let promisse: Promise<Object>;
    if (historyEvent._id) {
      promisse = this.http.put(`${API_URL}/${historyEvent._id}`, historyEvent).toPromise();
    } else {
      promisse = this.http.post(`${API_URL}`, historyEvent).toPromise();
    }

    promisse.then(result => {
      this.updateListener(historyEvent.settingsId);
      Swal.fire({
        title: 'Eventos!',
        text: 'Evento salvo com sucesso',
        type: 'success',
        confirmButtonText: 'Ok'
      });
    }).catch(response => {
      Swal.fire({
        title: 'Erro!',
        text: response.error.message,
        type: 'error',
        confirmButtonText: 'Ok'
      });
    });
  }

  delete(historyEvent: HistoryEvent) {
    this.http.delete(`${API_URL}/${historyEvent._id}`).toPromise().then(result => {
      this.updateListener(historyEvent.settingsId);
      Swal.fire({
        title: 'Eventos!',
        text: 'Evento excluído com sucesso',
        type: 'success',
        confirmButtonText: 'Ok'
      });
    }).catch(response => {
      Swal.fire({
        title: 'Erro!',
        text: response.error.message,
        type: 'error',
        confirmButtonText: 'Ok'
      });
    });
  }
}
