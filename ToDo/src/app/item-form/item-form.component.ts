import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';



@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ItemFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ItemFromComponentData
  ) { }

  ngOnInit(): void {
    const { name, description, date } = this.data;

      this.formGroup = this.formBuilder.group({
        name,
        description,
        date,
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface ItemFromComponentData {
  name: string;
  description: string;
  date: Date;
}
