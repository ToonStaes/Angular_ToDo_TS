import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo_list } from '../todo-list';
import { MatDialog } from '@angular/material/dialog';
import { TodoListService } from '../todo-list.service';
import { ItemFormComponent } from '../item-form/item-form.component';
import { Todo_item } from '../todo-item';
import * as moment from 'moment';
import { TodoItemService } from '../todo-item.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todo_list: Todo_list = {id: 0, name: "", category: "", items: [], showOptions: true}

  @Output() deleteItemEvent: EventEmitter<any> = new EventEmitter();
  @Output() addItemEvent: EventEmitter<any> = new EventEmitter();

  list!: Todo_list;

  deleteList(id: number) {
    console.log("delete list with id: " + id)
  }

  editList(id: number) {
    console.log("edit list with id: " + id)
  }

  addItem(id: number) {
    this.todolistService.getTodoListById(id).subscribe((result) => {
      this.list = result

      const dialogRef = this.dialog.open(ItemFormComponent, {
        width: '450px',
        data: {name: this.list.name, description: "", date: ""},
      });

      dialogRef.afterClosed().subscribe(formResult => {
        formResult.date = moment(formResult.date).format("DD/MM/YYYY")

        let inputItem: Todo_item = {
          description: formResult.description,
          listId: this.list.id,
          isFinished: false,
          isImportant: false,
          date: formResult.date,
          id: 0,
        }

        this.todoItemService.postItem(inputItem).subscribe(result => {
          this.addItemEvent.emit()
        },
        error => {
          console.log(error)
        })
      });
    })
  }

  editItem() {
    console.log("edit item")
  }

  deleteItem() {
    this.deleteItemEvent.emit()
  }

  constructor(public dialog: MatDialog, private todolistService: TodoListService, private todoItemService: TodoItemService) { }

  ngOnInit(): void {
  }
}
