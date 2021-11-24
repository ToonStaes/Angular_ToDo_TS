import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatMenuTrigger } from '@angular/material/menu';
import { Todo_item } from '../todo-item';
import { Subscription } from 'rxjs';
import { TodoItemService } from '../todo-item.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemFormComponent } from '../item-form/item-form.component';
import * as moment from 'moment';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, OnDestroy {
  @Input() todo_item: Todo_item = {id: 0, listId: 0, description: "", date: "", isImportant: false, isFinished: false, deadline_approaching: false, order: 0}

  @Output() deleteItemEvent: EventEmitter<any> = new EventEmitter();
  @Output() editItemEvent: EventEmitter<any> = new EventEmitter();

  deleteItem$: Subscription = new Subscription()

  constructor(private todoItemService: TodoItemService, private dialog: MatDialog) { }

  deleteItem(item: Todo_item) {
    this.deleteItem$ = this.todoItemService.deleteItem(item.id).subscribe(result => {
      console.log(item)
      //all went well
      this.deleteItemEvent.emit(item)
    }, error => {
      //error
      console.log(error)
    });
  }

  editItem(item: Todo_item) {
    let itemdate = moment(item.date, 'DD/MM/yyyy').toDate();
    console.log(itemdate)
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '450px',
      data: {description: item.description, date: itemdate},
    })

    dialogRef.afterClosed().subscribe(formResult => {
      formResult.date = moment(formResult.date).format("DD/MM/YYYY")

      item.description = formResult.description
      item.date = formResult.date
      var oneweek = moment().add(7, 'days');
      var itemDate = moment(item.date, 'DD/MM/YYYY');

      if (itemDate <= oneweek) {
        item.deadline_approaching = true;
      }
      else {
        item.deadline_approaching = false;
      }
      // item.deadline_approaching = false

      this.todoItemService.putItem(item.id, item).subscribe(result => {
        console.log(result)
        this.editItemEvent.emit(result)
      },
      error => {
        console.log(error)
      })
    })
  }

  toggleImportant(item: Todo_item) {
    item.isImportant = !item.isImportant // switches between true and false

    this.todoItemService.putItem(item.id, item).subscribe(result => {
      this.editItemEvent.emit(result)
    },
    error => {
      console.log(error)
    })
  }

  toggleFinished(item: Todo_item) {
    item.isFinished = !item.isFinished // switches between true and false

    this.todoItemService.putItem(item.id, item).subscribe(result => {
      this.editItemEvent.emit(result)
    },
    error => {
      console.log(error)
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.deleteItem$.unsubscribe()
  }

}
