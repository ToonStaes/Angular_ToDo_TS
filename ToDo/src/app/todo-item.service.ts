import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import * as moment from 'moment';

import { Todo_item } from './todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  private todo_items: Todo_item[] = [];


  constructor(private httpClient: HttpClient) {
  }

  getTodoItems(): Observable<Todo_item[]>{
    return this.httpClient.get<Todo_item[]>("http://localhost:3000/items")
  }

  getTodoItemsByListId(list_id: number): Observable<Todo_item[]> {
    return this.httpClient.get<Todo_item[]>("http://localhost:3000/items?list_id=" + list_id)
    // console.log("todo_items: " + this.todo_items)
    // var items: Todo_item[] = [];
    // this.todo_items.forEach(item => {
    //   if (item.list_id == id){
    //     items.push(item)
    //   }
    // });
    // return items;
  }

  getImportantItems(): Observable<Todo_item[]> {
    return this.httpClient.get<Todo_item[]>("http://localhost:3000/items?isImportant=true")
    // var items: Todo_item[] = [];
    // this.todo_items.forEach(item => {
    //   if (item.isImportant == true && item.isFinished == false){
    //     items.push(item)
    //   }
    // });
    // return items;
  }

  getItemsWithin1Week(): Todo_item[] {
    var items: Todo_item[] = [];
    var newDate: Date = new Date();
    var now = moment(newDate, "DD/MM/YYYY")
    var oneweek = moment(now, "DD/MM/YYYY").add(7, "days")
    this.todo_items.forEach(item => {
      var itemdate = moment(item.date, "DD/MM/YYYY");
      if (now <= itemdate && itemdate <= oneweek && item.isFinished){
        items.push(item)
      }
    });
    return items;
  }

  getFinishedItems(): Todo_item[] {
    var items: Todo_item[] = [];
    this.todo_items.forEach(item => {
      if (item.isFinished == true){
        items.push(item)
      }
    });
    return items;
  }

  getPastDeadlineItems(): Todo_item[] {
    var items: Todo_item[] = [];
    var newDate: Date = new Date();
    var now = moment(newDate, "DD/MM/YYYY")
    this.todo_items.forEach(item => {
      var itemdate = moment(item.date, "DD/MM/YYYY");
      if (item.isFinished == false && itemdate < now){
        items.push(item)
      }
    });
    return items;
  }
}

// let item1: Todo_item = {
    //   id: 1,
    //   list_id: 4,
    //   description: "itempje",
    //   date: "15/11/2022",
    //   isFinished: false,
    //   isImportant: false
    // }

    // let item2: Todo_item = {
    //   id: 2,
    //   list_id: 2,
    //   description: "itempje 2",
    //   date: "5/03/2022",
    //   isFinished: true,
    //   isImportant: false
    // }

    // let item3: Todo_item = {
    //   id: 3,
    //   list_id: 2,
    //   description: "itempje 3",
    //   date: "7/02/2022",
    //   isFinished: false,
    //   isImportant: true
    // }

    // let item4: Todo_item = {
    //   id: 4,
    //   list_id: 3,
    //   description: "itempje 4",
    //   date: "20/10/2021",
    //   isFinished: false,
    //   isImportant: true
    // }

    // this.todo_items.push(item1);
    // this.todo_items.push(item2);
    // this.todo_items.push(item3);
    // this.todo_items.push(item4);