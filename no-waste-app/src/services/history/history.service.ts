import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { History } from 'src/models/history';
import Swal from 'sweetalert2';


const API_URL = `${environment.API_URL}/histories`;

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getBySettingsId(settingsId) {
    return this.http.get<History[]>(`${API_URL}/${settingsId}`).toPromise();
  }

  save(history: History) {
    let promisse: Promise<Object>;
    if (history._id) {
      promisse = this.http.put(`${API_URL}/${history._id}`, history).toPromise();
    } else {
      promisse = this.http.post(`${API_URL}`, history).toPromise();
    }

    promisse.then(result => {
      Swal.fire({
        title: 'Eventos!',
        text: 'Histórico salvo com sucesso',
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

  delete(history: History) {
    this.http.delete(`${API_URL}/${history._id}`).toPromise().then(result => {
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
