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
  @Input() todo_item: Todo_item = {id: 0, listId: 0, description: "", date: "", isImportant: false, isFinished: false}

  @Output() deleteItemEvent: EventEmitter<any> = new EventEmitter();
  @Output() editItemEvent: EventEmitter<any> = new EventEmitter();

  deleteItem$: Subscription = new Subscription()

  constructor(private todoItemService: TodoItemService, private dialog: MatDialog) { }

  deleteItem(id: number) {
    this.deleteItem$ = this.todoItemService.deleteItem(id).subscribe(result => {
      //all went well
      this.deleteItemEvent.emit()
    }, error => {
      //error
      console.log(error)
    });
  }

  editItem(item: Todo_item) {
    console.log("edit item with id: " + item.id)

    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '450px',
      data: {description: item.description, date: item.date},
    })

    dialogRef.afterClosed().subscribe(formResult => {
      formResult.date = moment(formResult.date).format("DD/MM/YYYY")

      let inputItem: Todo_item = {
        description: formResult.description,
        listId: item.listId,
        isFinished: item.isFinished,
        isImportant: item.isImportant,
        date: formResult.date,
        id: item.id,
      }

      this.todoItemService.putItem(inputItem.id, inputItem).subscribe(result => {
        console.log("item component: "+result)
        this.editItemEvent.emit(result)
      },
      error => {
        console.log(error)
      })
    })
  }

  toggleImportant(item: Todo_item) {
    console.log("toggle important")
    item.isImportant = !item.isImportant // switches between true and false

    this.todoItemService.putItem(item.id, item).subscribe(result => {
      console.log(result)
      this.editItemEvent.emit(result)
    },
    error => {
      console.log(error)
    })
  }

  toggleFinished(item: Todo_item) {
    item.isFinished = !item.isFinished // switches between true and false

    this.todoItemService.putItem(item.id, item).subscribe(result => {
      this.editItemEvent.emit()
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
