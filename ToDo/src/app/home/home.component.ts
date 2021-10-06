import { Component, OnInit } from '@angular/core';
import { Todo_list } from '../todo-list';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todo_lists: Todo_list[] = [];

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.todo_lists = this.todoListService.getTodoLists();
  }

}
