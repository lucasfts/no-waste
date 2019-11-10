import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/services/user/user.service';
import { SettingsService } from 'src/services/settings/settings.service';
import { GeoclimaticService } from 'src/services/geoclimatic/geoclimatic.service';
import { Settings } from 'src/models/settings.model';
import { Meal } from 'src/models/meal';
import { History } from 'src/models/history';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Arroz', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
];

@Component({
  selector: 'app-create-history',
  templateUrl: './create-history.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    './create-history.component.css'
  ]
})
export class CreateHistoryComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  history: History = {
    settings: null,
    date: new Date(),
    wheater: '',
    meals: [
      { food: null, QtdProduced: null, QtdWasted: null }
    ],
    events: [
      { name: null }
    ]
  };

  constructor(private userService: UserService,
    private settingsService: SettingsService,
    private geoclimateService: GeoclimaticService) { }

  ngOnInit() {

    const userId = this.userService.getUserId();

    this.settingsService.getByUserId(userId)
      .then((settings: Settings) => {
        if (settings) {
          this.history.settings = settings;
        }

      }).catch(error => {

      });
  }

  addMeal() {
    this.history.meals.push({ food: null, QtdProduced: null, QtdWasted: null });
  }

  delMeal(index: number) {
    this.history.meals.splice(index, 1);
  }

  addEvent() {
    this.history.events.push({ name: null });
  }

  delEvent(index: number) {
    this.history.events.splice(index, 1);
  }

  saveHistory(form: NgForm) {

  }
}
