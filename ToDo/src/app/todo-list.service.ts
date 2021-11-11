import { Injectable } from '@angular/core';
import { TodoItemService } from './todo-item.service';
import { Todo_list } from './todo-list';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private todo_lists: Todo_list[] = [];

  constructor(private todoItemService: TodoItemService) {
    let list1: Todo_list = {
      id: 5,
      name: "School",
      category: "custom-grey",
      items: todoItemService.getTodoItemsByListId(4),
      showOptions: true
    }

    let list2: Todo_list = {
      id: 4,
      name: "Werk",
      category: "custom-green",
      items: todoItemService.getTodoItemsByListId(2),
      showOptions: true
    }

    let list3: Todo_list = {
      id: 3,
      name: "Sport",
      category: "custom-orange",
      items: todoItemService.getTodoItemsByListId(3),
      showOptions: true
    }

    let important: Todo_list= {
      id: 1,
      name: "Important",
      category: "important",
      items: todoItemService.getImportantItems(),
      showOptions: false
    }

    let approaching: Todo_list= {
      id: 6,
      name: "Deadline approaching",
      category: "important",
      items: todoItemService.getItemsWithin1Week(),
      showOptions: false
    }

    let finished: Todo_list = {
      id: 7,
      name: "Finished",
      category: "important",
      items: todoItemService.getFinishedItems(),
      showOptions: false
    }

    if (important.items.length > 0){
      this.todo_lists.push(important)
    }
    if (approaching.items.length > 0){
      this.todo_lists.push(approaching)
    }
    if (finished.items.length > 0){
      this.todo_lists.push(finished)
    }
    this.todo_lists.push(list1)
    this.todo_lists.push(list2)
    this.todo_lists.push(list3)
  }

  getTodoLists(): Todo_list[] {
    return this.todo_lists
  }
}
