import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  produced: number;
  wasted: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Frango Assado', produced: 815, wasted: '5 %'},
  {position: 2, name: 'Macarrão ao molho', produced: 773, wasted: '6,1 %'},
  {position: 3, name: 'Arroz', produced: 698, wasted: '9,7 %'},
  {position: 4, name: 'Feijão', produced: 650, wasted: '8,9 %'},
  {position: 5, name: 'Salada de frutas', produced: 205, wasted: '21 %'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    './dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'produced', 'wasted'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }


}
