import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Todo_item } from '../todo-item';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo_item: Todo_item = {id: 0, list_id: 0, omschrijving: "", datum: "", isImportant: false, isFinished: false}

  constructor() { }

  ngOnInit(): void {
  }

}
