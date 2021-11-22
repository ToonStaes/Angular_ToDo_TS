import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss'],
})
export class ListFormComponent implements OnInit {
  formGroup!: FormGroup;

  selectedColour!: string;

  isAdd: boolean = false;
  isEdit: boolean = false;
  colours: Colour[] = [
    { value: 'custom-red', viewValue: 'Red' },
    { value: 'custom-blue', viewValue: 'Blue' },
    { value: 'custom-grey', viewValue: 'Grey' },
    { value: 'custom-purple', viewValue: 'Purple' },
    { value: 'custom-orange', viewValue: 'Orange' },
    { value: 'custom-green', viewValue: 'Green' },
  ];

  constructor(
    private dialogRef: MatDialogRef<ListFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ListFromComponentData
  ) {}

  ngOnInit(): void {
    const { name, colour, kind } = this.data;

    if (kind == 'edit') {
      this.isEdit = true
      this.isAdd = false
    }else {
      this.isEdit = false;
      this.isAdd = true;
    }

    this.formGroup = this.formBuilder.group({
      name,
      colour,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

interface Colour {
  value: string;
  viewValue: string;
}

export interface ListFromComponentData {
  name: string;
  colour: string;
  kind: string;
}
