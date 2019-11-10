import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
import { GeoclimaticService } from 'src/services/geoclimatic/geoclimatic.service';
import { State } from 'src/models/state.model';
import { City } from 'src/models/city.model';
import { UserService } from 'src/services/user/user.service';
import { SettingsService } from 'src/services/settings/settings.service';
import { Settings } from 'src/models/settings.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    './settings.component.css'
  ]
})
export class SettingsComponent implements OnInit {
  states: State[];
  cities: City[];

  user: any;
  settings: Settings;

  stateControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);

  settingsForm = new FormGroup({
    state: this.stateControl,
    city: this.cityControl
  });

  constructor(private userService: UserService,
    private settingsService: SettingsService,
    private geoclimateService: GeoclimaticService) { }

  ngOnInit() {

    this.settings = {
      _id: null,
      averagePeople: null,
      institution: null,
      state: null,
      city: null
    };

    const userId = this.userService.getUserId();

    this.settingsService.getByUserId(userId)
      .then(settings => {
        console.log("SETTINGS", settings);
        if (settings) {
          this.settings = settings;
        }
        this.getStates();
      }).catch(error => {
        this.getStates();
      });

  }

  getStates() {
    this.geoclimateService.getStates()
      .then((states) => {
        this.states = states.sort(this.orderByNome);
        if (this.settings.state) {
          this.settingsForm.controls['state'].setValue(this.settings.state);
          this.getCities(this.settings.state.id);
        }
      });
  }

  stateChange(selectedItem) {
    this.settings.city = null;
    this.cityControl.setValue('');
    this.getCities(selectedItem.value.id);
  }

  getCities(cityId) {
    this.geoclimateService.getCities(cityId)
      .then((cities) => {
        this.cities = cities.sort(this.orderByNome);
        if (this.settings.city) {
          this.settingsForm.controls['city'].setValue(this.settings.city);
        }
      });
  }

  saveSettings(form: NgForm) {
    if (form.invalid || this.stateControl.invalid || this.cityControl.invalid) {
      return;
    }
    this.settingsService.save(this.settings)
      .then(result => {
        console.log(result);
        Swal.fire({
          title: 'Configurações!',
          text: 'Configuração salva com sucesso',
          type: 'success',
          confirmButtonText: 'Ok'
        });
      }).catch(error => {
        Swal.fire({
          title: 'Erro!',
          text: error.message,
          type: 'error',
          confirmButtonText: 'Ok'
        });
      });
  }

  orderByNome(a, b): number {
    if (a.nome < b.nome) { return -1; }
    else if (a.nome > b.nome) { return 1; }
    else { return 0; }
  }

  compareObjectsById(a, b) {
    return a && b && a.id === b.id;
  }
}
