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
      id: 4,
      name: "School",
      category: "custom-grey",
      items: todoItemService.getTodoItemsByListId(4)
    }

    let list2: Todo_list = {
      id: 2,
      name: "Werk",
      category: "custom-green",
      items: todoItemService.getTodoItemsByListId(2)
    }

    let list3: Todo_list = {
      id: 3,
      name: "Sport",
      category: "custom-orange",
      items: todoItemService.getTodoItemsByListId(3)
    }

    let important: Todo_list= {
      id: 1,
      name: "Important",
      category: "important",
      items: todoItemService.getImportantItems()
    }

    let approaching: Todo_list= {
      id: 2,
      name: "Deadline approaching",
      category: "important",
      items: todoItemService.getItemsWithin1Week()
    }

    this.todo_lists.push(important)
    this.todo_lists.push(approaching)
    this.todo_lists.push(list1)
    this.todo_lists.push(list2)
    this.todo_lists.push(list3)
  }

  getTodoLists(): Todo_list[] {
    return this.todo_lists
  }
}
