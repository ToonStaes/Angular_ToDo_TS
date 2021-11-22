import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo_list } from '../todo-list';
import { MatDialog } from '@angular/material/dialog';
import { TodoListService } from '../todo-list.service';
import { ItemFormComponent } from '../item-form/item-form.component';
import { Todo_item } from '../todo-item';
import * as moment from 'moment';
import { TodoItemService } from '../todo-item.service';
import { ListFormComponent } from '../list-form/list-form.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() todo_list: Todo_list = {
    id: 0,
    name: '',
    category: '',
    items: [],
    showOptions: true,
  };

  @Output() deleteItemEvent: EventEmitter<any> = new EventEmitter();
  @Output() addItemEvent: EventEmitter<any> = new EventEmitter();
  @Output() editItemEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteListEvent: EventEmitter<any> = new EventEmitter();
  @Output() editListEvent: EventEmitter<any> = new EventEmitter();

  todoItemEdit?: Todo_item;

  list!: Todo_list;

  deleteList(list: Todo_list) {
    console.log('delete list with id: ' + list.id);
    this.todolistService.deleteList(list.id).subscribe((result) => {
      this.deleteListEvent.emit(list);
    });
  }

  editList(list: Todo_list) {
    console.log('edit list with id: ' + list.id);
    const dialogRef = this.dialog.open(ListFormComponent, {
      width: '250px',
      data: { name: list.name, colour: list.category, kind: 'edit' },
    });

    dialogRef.afterClosed().subscribe((formResult) => {
      list.name = formResult.name;
      list.category = formResult.colour;

      this.todolistService.putList(list.id, list).subscribe((result) => {
        console.log(result)
        this.editListEvent.emit(result)
      });
    });
  }

  addItem(listId: number) {
    this.todolistService.getTodoListById(listId).subscribe((result) => {
      // this.list = result;

      const dialogRef = this.dialog.open(ItemFormComponent, {
        width: '450px',
        data: { description: '', date: '' },
      });

      dialogRef.afterClosed().subscribe((formResult) => {
        let deadline_approaching = false;
        var oneweek = moment().add(7, 'days');
        var itemDate = moment(formResult.date, 'DD/MM/YYYY');

        if (itemDate <= oneweek) {
          deadline_approaching = true;
        } else {
          deadline_approaching = false;
        }
        let inputItem: Todo_item = {
          description: formResult.description,
          listId: listId,
          isFinished: false,
          isImportant: false,
          date: itemDate.format('DD/MM/YYYY'),
          id: 0,
          deadline_approaching: deadline_approaching,
        };

        this.todoItemService.postItem(inputItem).subscribe(
          (result) => {
            this.addItemEvent.emit(result);
          },
          (error) => {
            console.log(error);
          }
        );
      });
    });
  }

  editItem(result: Todo_item) {
    this.editItemEvent.emit(result);
  }

  deleteItem(result: Todo_item) {
    console.log('deleteItem functie in list');
    console.log(result);
    this.deleteItemEvent.emit(result);
  }

  constructor(
    private dialog: MatDialog,
    private todolistService: TodoListService,
    private todoItemService: TodoItemService
  ) {}

  ngOnInit(): void {}
}
