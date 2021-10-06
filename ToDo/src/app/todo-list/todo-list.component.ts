import { Component, Input, OnInit } from '@angular/core';
import { Todo_list } from '../todo-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todo_list: Todo_list = {id: 0, name: "", category: "", items: []}

  constructor() { }

  ngOnInit(): void {
  }

  styles() {
    let styles = {
      'background-color': this.todo_list.category,
    };
    return styles
  }

}
