import { Component, OnInit, Inject } from '@angular/core';
import { HistoryEvent } from 'src/models/history-event';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-history-event',
  templateUrl: './history-event.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    './history-event.component.css'
  ]
})
export class HistoryEventComponent implements OnInit {
  historyEvent: HistoryEvent;

  constructor(public dialogRef: MatDialogRef<HistoryEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HistoryEvent) {
    if (data) {
      this.historyEvent = data;
    }
  }

  ngOnInit() {
  }

  saveEvent(form: NgForm) {

  }


}
