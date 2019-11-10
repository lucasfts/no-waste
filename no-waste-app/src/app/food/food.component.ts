import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Food } from 'src/models/food';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: [
    '../../assets/css/no-waste.css',
    './food.component.css'
  ]
})
export class FoodComponent implements OnInit {
  food: Food;

  constructor(public dialogRef: MatDialogRef<FoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food) {
    if (data) {
      this.food = data;
    }
  }

  ngOnInit(): void {

  }

  saveFood(form: NgForm) {

  }

}
