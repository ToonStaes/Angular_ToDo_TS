import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Todo_item } from '../todo-item';
import { TodoItemService } from '../todo-item.service';
import { Todo_list } from '../todo-list';
import { TodoListService } from '../todo-list.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todo_lists: Todo_list[] = [];
  todo_items: Todo_item[] = [];
  important_items: Todo_item[] = [];
  important_list!: Todo_list;
  subject: Subject<any> = new Subject();
  todoItemEdit?: Todo_item;

  constructor(private todoListService: TodoListService, private todoItemService: TodoItemService) {

  }

  deleteItem(){
    this.getLists()
  }

  addItem(){
    this.getLists()
  }

  editItem(result: Todo_item){
    console.log("home component: " + result)
    this.todo_lists.forEach(list => {
      console.log(list)
      console.log(list.items)
      list.items.forEach(item => {
        console.log(item)
        if (item.id = result.id){
          item = result
        }
      })
    });
  }

  getLists(): void {
    this.todo_lists = []

    // Get prebuilt lists from DB
    this.todoListService.getTodoLists().subscribe((todoLists) => {
      // this.todo_lists = todoLists
      for (let listIndex in todoLists){
        this.todo_lists.push(todoLists[listIndex])
      }
    })
  }

  ngOnInit(): void {
    this.getLists()
  }
}
