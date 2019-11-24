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
import { HistoryService } from 'src/services/history/history.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-create-history',
  templateUrl: './create-history.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    './create-history.component.css'
  ]
})
export class CreateHistoryComponent implements OnInit, OnDestroy {
  history: History = {
    _id: null,
    settings: null,
    date: new Date(),
    hour: null,
    wheater: '',
    meals: [
      { food: null, qtdProduced: null, qtdWasted: null, forecast: 0 }
    ],
    events: [
      null
    ]
  };

  displayedColumns: string[] = ['food', 'forecast'];
  dataSource =  new MatTableDataSource<Meal>(this.history.meals);

  private foodListener: Subscription;
  private historyEventListener: Subscription;

  settings: Settings;
  foods: Food[];
  events: HistoryEvent[];


  constructor(private userService: UserService,
    private historyService: HistoryService,
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
          this.settings = settings;
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
    this.foodService.getBySettingsId(this.settings._id)
      .then(foods => {
        this.foods = foods;
      })
      .catch(error => {
        this.foods = [];
      });
  }

  private getEvents() {
    this.historyEventService.getBySettingsId(this.settings._id)
      .then(events => {
        this.events = events;
      })
      .catch(error => {
        this.events = [];
      });
  }

  addMeal() {
    this.history.meals.push({ food: null, qtdProduced: null, qtdWasted: null, forecast: 0 });
    this.dataSource.data = this.history.meals;
  }

  delMeal(index: number) {
    this.history.meals.splice(index, 1);
    this.dataSource.data = this.history.meals;
  }

  addEvent() {
    this.history.events.push(null);
  }

  delEvent(index: number) {
    this.history.events.splice(index, 1);
  }

  saveHistory(form: NgForm) {
    if (form.valid) {
      this.historyService.save(this.history)
        .then(result => {
          this.history = {
            _id: null,
            settings: this.settings,
            date: new Date(),
            hour: null,
            wheater: '',
            meals: [
              { food: null, qtdProduced: null, qtdWasted: null, forecast: 0 }
            ],
            events: [
              null
            ]
          };

          Swal.fire({
            title: 'Histórico!',
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
  }

  foodModal() {
    this.dialog.open(FoodComponent, { width: '50%', data: { settingsId: this.settings._id } });
  }

  eventModal() {
    this.dialog.open(HistoryEventComponent, { width: '50%', data: { settingsId: this.settings._id } });
  }

  calculateForecast(index: number) {
    this.history.meals[index].forecast = this.settings.averagePeople * Math.round(Math.random() * 10);
  }

  ngOnDestroy(): void {
    this.foodListener.unsubscribe();
    this.historyEventListener.unsubscribe();
  }

}
