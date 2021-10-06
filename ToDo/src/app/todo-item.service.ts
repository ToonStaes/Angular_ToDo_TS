import { Injectable } from '@angular/core';
import { Todo_item } from './todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  private todo_items: Todo_item[] = [];


  constructor() {
    let item1: Todo_item = {
      id: 1,
      list_id: 1,
      omschrijving: "itempje",
      datum: "23/03/2022",
      isFinished: false,
      isImportant: false
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
      datum: "7/08/2022",
      isFinished: false,
      isImportant: true
    }

    this.todo_items.push(item1);
    this.todo_items.push(item2);
    this.todo_items.push(item3);
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
}
