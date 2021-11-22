import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Todo_item } from '../todo-item';
import { TodoItemService } from '../todo-item.service';
import { Todo_list } from '../todo-list';
import { TodoListService } from '../todo-list.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ListFormComponent } from '../list-form/list-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todo_lists: Todo_list[] = [];
  todo_items: Todo_item[] = [];
  important_items: Todo_item[] = [];
  important_list!: Todo_list;
  subject: Subject<any> = new Subject();
  todoItemEdit?: Todo_item;

  constructor(
    private todoListService: TodoListService,
    private dialog: MatDialog
  ) {}

  deleteItem(result: Todo_item) {
    this.todo_lists.forEach((list) => {
      list.items.forEach((item) => {
        if (item.id == result.id) {
          let itemIndex = list.items.indexOf(item, 0);
          if (itemIndex > -1) {
            list.items.splice(itemIndex, 1);
          }
        }
      });
    });
  }

  addItem(result: Todo_item) {
    this.todo_lists.forEach((list) => {
      if (list.id == result.listId) {
        list.items.push(result);
      }
    });
  }

  editItem(result: Todo_item) {
    console.log('editItem received');
    console.log(result);
    this.todo_lists.forEach((list) => {
      list.items.forEach((item) => {
        if (item.id == result.id) {
          item = result;
        }
      });
    });
  }

  deleteList(result: Todo_list) {
    this.todo_lists.forEach((list) => {
      if (list.id == result.id) {
        let listIndex = this.todo_lists.indexOf(list, 0);
        if (listIndex > -1) {
          this.todo_lists.splice(listIndex, 1);
        }
      }
    });
  }

  addList() {
    const dialogRef = this.dialog.open(ListFormComponent, {
      width: '250px',
      data: { name: '', colour: '', kind: 'add' },
    });

    dialogRef.afterClosed().subscribe((formResult) => {
      let inputList: Todo_list = {
        id: 0,
        category: formResult.colour,
        name: formResult.name,
        items: [],
        showOptions: true,
      };

      this.todoListService.postList(inputList).subscribe(
        (result) => {
          console.log('list added');
          console.log(result);
          this.todo_lists.push(result)
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  listAdded(list: Todo_list) {
    this.todo_lists.push(list);
  }

  checkDeadline(item: Todo_item): void {
    var oneweek = moment().add(7, 'days');
    var itemDate = moment(item.date, 'DD/MM/YYYY');

    if (itemDate <= oneweek) {
      item.deadline_approaching = true;
    }
  }

  getLists(): void {
    this.todo_lists = [];

    // Get prebuilt lists from DB
    this.todoListService.getTodoLists().subscribe((todoLists) => {
      this.todo_lists = todoLists;
      this.todo_lists.forEach((list) => {
        list.items.forEach((item) => {
          this.checkDeadline(item);
        });
      });
    });
  }

  ngOnInit(): void {
    this.getLists();
  }
}
