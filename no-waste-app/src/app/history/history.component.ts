import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoryView } from 'src/models/historyView';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

const DATA_VIEW: HistoryView[] = [
  { dateHour: '22/10/2019 18:10', totalForecast: '989 kg', totalProduced: '900 kg', totalWasted: '15 kg' },
  { dateHour: '22/10/2019 18:10', totalForecast: '989 kg', totalProduced: '900 kg', totalWasted: '15 kg' },
  { dateHour: '22/10/2019 18:10', totalForecast: '989 kg', totalProduced: '900 kg', totalWasted: '15 kg' },
  { dateHour: '22/10/2019 18:10', totalForecast: '989 kg', totalProduced: '900 kg', totalWasted: '15 kg' },
  { dateHour: '22/10/2019 18:10', totalForecast: '989 kg', totalProduced: '900 kg', totalWasted: '15 kg' },
  { dateHour: '22/10/2019 18:10', totalForecast: '989 kg', totalProduced: '900 kg', totalWasted: '15 kg' },
  { dateHour: '22/10/2019 18:10', totalForecast: '989 kg', totalProduced: '900 kg', totalWasted: '15 kg' },
  { dateHour: '22/10/2019 18:10', totalForecast: '989 kg', totalProduced: '900 kg', totalWasted: '15 kg' },
  { dateHour: '22/10/2019 18:10', totalForecast: '989 kg', totalProduced: '900 kg', totalWasted: '15 kg' },
  { dateHour: '22/10/2019 18:10', totalForecast: '989 kg', totalProduced: '900 kg', totalWasted: '15 kg' },

];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    './history.component.css'
  ]
})
export class HistoryComponent implements OnInit {

  displayedColumns: string[] = ['dateHour', 'totalForecast', 'totalProduced', 'totalWasted', 'actions'];
  dataSource = new MatTableDataSource<HistoryView>(DATA_VIEW);

  constructor() { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }


}
