import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoryView } from 'src/models/historyView';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HistoryService } from 'src/services/history/history.service';
import { Settings } from 'src/models/settings.model';
import { UserService } from 'src/services/user/user.service';
import { SettingsService } from 'src/services/settings/settings.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    './history.component.css'
  ]
})
export class HistoryComponent implements OnInit {

  settings: Settings;

  displayedColumns: string[] = ['dateHour', 'totalForecast', 'totalProduced', 'totalWasted', 'actions'];
  dataSource = new MatTableDataSource<HistoryView>([]);

  constructor(private router: Router,
    private userService: UserService,
    private historyService: HistoryService,
    private settingsService: SettingsService, ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    const userId = this.userService.getUserId();

    this.settingsService.getByUserId(userId)
      .then((settings: Settings) => {
        if (settings) {
          this.settings = settings;
          this.getHistory();
        } else {
          this.router.navigate(['/settings']);
        }

      }).catch(error => {
        this.router.navigate(['/settings']);
      });
  }

  deleteHistory(history: HistoryView) {
    Swal.fire({
      title: '',
      text: 'Tem certeza que deseja excluir este histórico?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.deleteHistoryDb(history);
      }
    });
  }

  private deleteHistoryDb(history: HistoryView) {
    this.historyService.delete(history).then(result => {
      this.getHistory();
      Swal.fire({
        title: 'Histórico!',
        text: 'Histórico excluído com sucesso',
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

  updateHistory(history: HistoryView) {
    this.router.navigate(['edit-history/' + history._id]);
  }

  private getHistory() {
    this.historyService.getHistoryViewBySettingsId(this.settings._id)
      .then(historyList => {
        this.dataSource.data = historyList;
      });
  }

}
