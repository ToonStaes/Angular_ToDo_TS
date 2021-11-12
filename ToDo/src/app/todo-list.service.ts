import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TodoItemService } from './todo-item.service';
import { Todo_list } from './todo-list';
import { Todo_item } from './todo-item';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private todo_lists: Todo_list[] = [];
  private todo_items: Todo_item[] = [];

  constructor(private httpClient: HttpClient) {

  }

  getTodoLists(): Observable<Todo_list[]> {
    return this.httpClient.get<Todo_list[]>("http://localhost:3000/lists?_embed=items")
  }

  // let list1: Todo_list = {
    //   id: 5,
    //   name: "School",
    //   category: "custom-grey",
    //   items: todoItemService.getTodoItemsByListId(4),
    //   showOptions: true
    // }

    // let list2: Todo_list = {
    //   id: 4,
    //   name: "Werk",
    //   category: "custom-green",
    //   items: todoItemService.getTodoItemsByListId(2),
    //   showOptions: true
    // }

    // let list3: Todo_list = {
    //   id: 3,
    //   name: "Sport",
    //   category: "custom-orange",
    //   items: todoItemService.getTodoItemsByListId(3),
    //   showOptions: true
    // }

    // let important: Todo_list= {
    //   id: 1,
    //   name: "Important",
    //   category: "important",
    //   items: todoItemService.getImportantItems(),
    //   showOptions: false
    // }

    // let approaching: Todo_list= {
    //   id: 6,
    //   name: "Deadline approaching",
    //   category: "important",
    //   items: todoItemService.getItemsWithin1Week(),
    //   showOptions: false
    // }

    // let finished: Todo_list = {
    //   id: 7,
    //   name: "Finished",
    //   category: "important",
    //   items: todoItemService.getFinishedItems(),
    //   showOptions: false
    // }

    // let pastDeadline: Todo_list = {
    //   id: 8,
    //   name: "Past deadline",
    //   category: "important",
    //   items: todoItemService.getPastDeadlineItems(),
    //   showOptions: false
    // }

    // if (important.items.length > 0){
    //   this.todo_lists.push(important)
    // }
    // if (approaching.items.length > 0){
    //   this.todo_lists.push(approaching)
    // }
    // if (finished.items.length > 0){
    //   this.todo_lists.push(finished)
    // }
    // if (pastDeadline.items.length > 0){
    //   this.todo_lists.push(pastDeadline)
    // }
    // this.todo_lists.push(list1)
    // this.todo_lists.push(list2)
    // this.todo_lists.push(list3)
}
