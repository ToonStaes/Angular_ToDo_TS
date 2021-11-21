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

  deleteItem(result: Todo_item){
    this.todo_lists.forEach(list => {
      list.items.forEach(item => {
        if (item.id == result.id){
          let itemIndex = list.items.indexOf(item, 0)
          if (itemIndex > -1) {
            list.items.splice(itemIndex, 1)
          }
        }
      });
    })
  }

  addItem(result: Todo_item){
    this.todo_lists.forEach(list => {
      if (list.id == result.listId){
        list.items.push(result)
      }
    })
  }

  editItem(result: Todo_item){
    console.log("editItem received")
    console.log(result)
    this.todo_lists.forEach(list => {
      list.items.forEach(item => {
        if (item.id == result.id){
          console.log("id gelijk")
          item = result
          var newDate: Date = new Date();
          var now = moment(newDate, 'DD/MM/YYYY');
          var oneweek = moment(now).add(7, 'days');
          var itemDate = moment(item.date, 'DD/MM/YYYY');

          if (itemDate <= oneweek) {
            item.deadline_approaching = true;
          }
        }
      })
    });
  }

  getLists(): void {
    this.todo_lists = []

    // Get prebuilt lists from DB
    this.todoListService.getTodoLists().subscribe((todoLists) => {
      this.todo_lists = todoLists
      this.todo_lists.forEach(list => {
        list.items.forEach(item => {
          var newDate: Date = new Date();
          var now = moment(newDate, 'DD/MM/YYYY');
          var oneweek = moment(now).add(7, 'days');
          var itemDate = moment(item.date, 'DD/MM/YYYY');

          if (itemDate <= oneweek){
            item.deadline_approaching = true
          }
        })
      });
    })
  }

  ngOnInit(): void {
    this.getLists()
  }
}
