import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { History } from 'src/models/history';
import Swal from 'sweetalert2';
import { HistoryView } from 'src/models/historyView';


const API_URL = `${environment.API_URL}/histories`;

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getHistoryById(historyId: string){
    return this.http.get<History>(`${API_URL}/${historyId}`).toPromise();
  }

  getHistoryViewBySettingsId(settingsId) {
    return this.getHistoryViewList(settingsId);
  }

  private getHistoryViewList(settingsId) {
    return this.http.get<History[]>(`${API_URL}/list/${settingsId}`).toPromise()
      .then(result => {
        return new Promise<HistoryView[]>((resolve) => {
          {
            const historyViewList: HistoryView[] = [];

            for (const history of result) {

              let totalForecastLiters = 0;
              let totalForecastKg = 0;
              let totalProducedLiters = 0;
              let totalProducedKg = 0;
              let totalWastedLiters = 0;
              let totalWastedKg = 0;
              let hasWastedLiters = false;
              let hasWastedKg = false;

              for (const meal of history.meals) {

                if (meal.food.unit === 'L') {
                  totalForecastLiters += meal.forecast;
                  totalProducedLiters += meal.qtdProduced;
                  if (meal.qtdWasted) {
                    hasWastedLiters = true;
                    totalWastedLiters += meal.qtdWasted;
                  }
                } else {
                  totalForecastKg += meal.forecast;
                  totalProducedKg += meal.qtdProduced;
                  if (meal.qtdWasted) {
                    hasWastedKg = true;
                    totalWastedKg += meal.qtdWasted;
                  }
                }
              }

              const date = new Date(history.date);
              const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
              const wastedLiters = hasWastedLiters ? totalWastedLiters + ' L' : 'N/A';
              const wastedKg = hasWastedKg ? totalWastedKg + ' Kg' : 'N/A';

              const historyView = {
                _id: history._id,
                dateHour: dateString + ' ' + history.hour,
                totalForecast: totalForecastKg + ' Kg  |  ' + totalForecastLiters + ' L',
                totalProduced: totalProducedKg + ' Kg  |  ' + totalProducedLiters + ' L',
                totalWasted: wastedKg + '  |  ' + wastedLiters
              };

              historyViewList.push(historyView);
            }

            resolve(historyViewList);
          }
        });
      })
      .catch(error => {
        return new Promise<HistoryView[]>((resolve) => {
          resolve([]);
        });
      });
  }

  save(history: History) {
    let promisse: Promise<Object>;
    if (history._id) {
      promisse = this.http.put(`${API_URL}/${history._id}`, history).toPromise();
    } else {
      promisse = this.http.post(`${API_URL}`, history).toPromise();
    }

    return promisse;
  }

  delete(historyView: HistoryView) {
    return this.http.delete(`${API_URL}/${historyView._id}`).toPromise();
  }

}
