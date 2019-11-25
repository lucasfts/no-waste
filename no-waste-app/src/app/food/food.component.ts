import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Food } from 'src/models/food';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodService } from 'src/services/food/food.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

const CATEGORIAS_DATA = [
  'Bebidas',
  'Carnes',
  'Congelados',
  'Doces',
  'Frutas',
  'Legumes',
  'Massas'
];

const UNIDADES_DATA = [
  {text: 'Kilogramas', value: 'Kg'},
  {text: 'Litros', value: 'L'}
];

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    './food.component.css'
  ]
})
export class FoodComponent implements OnInit, OnDestroy {
  food: Food;
  private foodListener: Subscription;

  categorias = CATEGORIAS_DATA;
  unidades = UNIDADES_DATA;

  displayedColumns: string[] = ['name', 'unit', 'category', 'action'];
  dataSource = new MatTableDataSource<Food>();

  constructor(private foodService: FoodService,
    public dialogRef: MatDialogRef<FoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food) {
    if (data) {
      this.food = data;
      this.getFoods(data.settingsId);
    }
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this.foodListener = this.foodService.getFoodListener()
      .subscribe(foods => {
        this.dataSource.data = foods;
      });
  }

  private getFoods(settingsId) {
    this.foodService.getBySettingsId(settingsId)
      .then(foods => {
        this.dataSource.data = foods;
      })
      .catch(error => {
        this.dataSource.data = [];
      });
  }

  saveFood(form: NgForm) {
    if (form.valid) {
      this.foodService.save(this.food);
    }
  }

  deleteFood(food: Food) {
    console.log(food);
    Swal.fire({
      title: '',
      text: 'Tem certeza que deseja excluir este alimento?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.foodService.delete(food);
      }
    });
  }

  ngOnDestroy(): void {
    this.foodListener.unsubscribe();
  }

}
