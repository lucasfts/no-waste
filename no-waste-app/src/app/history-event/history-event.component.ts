import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { HistoryEvent } from 'src/models/history-event';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { HistoryEventService } from 'src/services/history-event/history-event.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-history-event',
  templateUrl: './history-event.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    './history-event.component.css'
  ]
})
export class HistoryEventComponent implements OnInit, OnDestroy {
  historyEvent: HistoryEvent;
  private historyEventListener: Subscription;

  displayedColumns: string[] = ['name', 'action'];
  dataSource = new MatTableDataSource<HistoryEvent>();

  constructor(private historyEventService: HistoryEventService,
    public dialogRef: MatDialogRef<HistoryEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HistoryEvent) {
    if (data) {
      this.historyEvent = data;
      this.getEvents(data.settingsId);
    }
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.historyEventListener = this.historyEventService.getHistoryEventListener()
      .subscribe(events => {
        this.dataSource.data = events;
      });
  }

  private getEvents(settingsId) {
    this.historyEventService.getBySettingsId(settingsId)
      .then(events => {
        this.dataSource.data = events;
      })
      .catch(error => {
        this.dataSource.data = [];
      });
  }

  saveEvent(form: NgForm) {
    if (form.valid) {
      this.historyEventService.save(this.historyEvent);
    }
  }

  deleteEvent(historyEvent: HistoryEvent) {
    Swal.fire({
      title: '',
      text: 'Tem certeza que deseja excluir este evento?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.historyEventService.delete(historyEvent);
      }
    });
  }

  ngOnDestroy(): void {
    this.historyEventListener.unsubscribe();
  }


}
