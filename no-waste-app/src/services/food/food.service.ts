import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from 'src/models/food';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

const API_URL = `${environment.API_URL}/foods`;

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private foodListener = new Subject<Food[]>();

  constructor(private http: HttpClient) { }

  getFoodListener() {
    return this.foodListener.asObservable();
  }

  getBySettingsId(settingsId) {
    return this.http.get<Food[]>(`${API_URL}/${settingsId}`).toPromise();
  }

  private updateListener(settingsId) {
    this.getBySettingsId(settingsId).then(foods => this.foodListener.next(foods));
  }

  save(food: Food) {
    let promisse: Promise<Object>;
    if (food._id) {
      promisse = this.http.put(`${API_URL}/${food._id}`, food).toPromise();
    } else {
      promisse = this.http.post(`${API_URL}`, food).toPromise();
    }

    promisse.then(result => {
      this.updateListener(food.settingsId);
      Swal.fire({
        title: 'Alimentos!',
        text: 'Alimento salvo com sucesso',
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

  delete(food: Food) {
    this.http.delete(`${API_URL}/${food._id}`).toPromise().then(result => {
      this.updateListener(food.settingsId);
      Swal.fire({
        title: 'Alimentos!',
        text: 'Alimento excluído com sucesso',
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
