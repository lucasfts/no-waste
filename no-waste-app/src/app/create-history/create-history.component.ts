import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/services/user/user.service';
import { SettingsService } from 'src/services/settings/settings.service';
import { GeoclimaticService } from 'src/services/geoclimatic/geoclimatic.service';
import { Settings } from 'src/models/settings.model';
import { Meal } from 'src/models/meal';
import { History } from 'src/models/history';
import { MatDialog } from '@angular/material/dialog';
import { FoodComponent } from '../food/food.component';
import { HistoryEventComponent } from '../history-event/history-event.component';
import { Food } from 'src/models/food';
import { FoodService } from 'src/services/food/food.service';
import { Subscription } from 'rxjs';
import { HistoryEventService } from 'src/services/history-event/history-event.service';
import { HistoryEvent } from 'src/models/history-event';


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
export class CreateHistoryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  private foodListener: Subscription;
  private historyEventListener: Subscription;


  settingsId: string;
  foods: Food[];
  events: HistoryEvent[];

  history: History = {
    settings: null,
    date: new Date(),
    wheater: '',
    meals: [
      { food: null, QtdProduced: null, QtdWasted: null }
    ],
    events: [
      null
    ]
  };

  constructor(private userService: UserService,
    private settingsService: SettingsService,
    private geoclimateService: GeoclimaticService,
    private foodService: FoodService,
    private historyEventService: HistoryEventService,
    public dialog: MatDialog) { }


  ngOnInit() {

    const userId = this.userService.getUserId();

    this.settingsService.getByUserId(userId)
      .then((settings: Settings) => {
        if (settings) {
          this.history.settings = settings;
          this.settingsId = settings._id;
          this.getFoods();
          this.getEvents();
        }

      }).catch(error => {

      });

    this.foodListener = this.foodService.getFoodListener()
      .subscribe(foods => {
        this.foods = foods;
      });

    this.historyEventListener = this.historyEventService.getHistoryEventListener()
      .subscribe(events => {
        this.events = events;
      });
  }

  private getFoods() {
    this.foodService.getBySettingsId(this.settingsId)
      .then(foods => {
        this.foods = foods;
      })
      .catch(error => {
        this.foods = [];
      });
  }

  private getEvents() {
    this.historyEventService.getBySettingsId(this.settingsId)
      .then(events => {
        this.events = events;
      })
      .catch(error => {
        this.events = [];
      });
  }

  addMeal() {
    this.history.meals.push({ food: null, QtdProduced: null, QtdWasted: null });
  }

  delMeal(index: number) {
    this.history.meals.splice(index, 1);
  }

  addEvent() {
    this.history.events.push(null);
  }

  delEvent(index: number) {
    this.history.events.splice(index, 1);
  }

  saveHistory(form: NgForm) {

  }

  foodModal() {
    this.dialog.open(FoodComponent, { width: '50%', data: { settingsId: this.settingsId } });
  }

  eventModal() {
    this.dialog.open(HistoryEventComponent, { width: '50%', data: { settingsId: this.settingsId } });
  }

  ngOnDestroy(): void {
    this.foodListener.unsubscribe();
  }

}
