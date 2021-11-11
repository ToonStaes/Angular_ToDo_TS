import { DebugElement, Injectable } from '@angular/core';
import * as moment from 'moment';
import { Todo_item } from './todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  private todo_items: Todo_item[] = [];


  constructor() {
    let item1: Todo_item = {
      id: 1,
      list_id: 4,
      omschrijving: "itempje",
      datum: "23/03/2022",
      isFinished: false,
      isImportant: false,
    }

    let item2: Todo_item = {
      id: 2,
      list_id: 2,
      omschrijving: "itempje 2",
      datum: "5/03/2022",
      isFinished: true,
      isImportant: false
    }

    let item3: Todo_item = {
      id: 3,
      list_id: 2,
      omschrijving: "itempje 3",
      datum: "7/02/2022",
      isFinished: false,
      isImportant: true
    }

    let item4: Todo_item = {
      id: 4,
      list_id: 3,
      omschrijving: "itempje 4",
      datum: "20/10/2021",
      isFinished: false,
      isImportant: true
    }

    this.todo_items.push(item1);
    this.todo_items.push(item2);
    this.todo_items.push(item3);
    this.todo_items.push(item4);
  }

  getTodoItemsByListId(id: number): Todo_item[] {
    var items: Todo_item[] = [];
    this.todo_items.forEach(item => {
      if (item.list_id == id){
        items.push(item)
      }
    });
    return items;
  }

  getImportantItems(): Todo_item[] {
    var items: Todo_item[] = [];
    this.todo_items.forEach(item => {
      if (item.isImportant == true){
        items.push(item)
      }
    });
    return items;
  }

  getItemsWithin1Week(): Todo_item[] {
    var items: Todo_item[] = [];
    var newDate: Date = new Date();
    this.todo_items.forEach(item => {
      var itemdate = moment(item.datum, "DD/MM/YYYY");
      var now = moment(newDate, "DD/MM/YYYY")
      var oneweek = moment(now, "DD/MM/YYYY").add(7, "days")
      if (now <= itemdate && itemdate <= oneweek){
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
}

