import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo_list } from '../todo-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todo_list: Todo_list = {id: 0, name: "", category: "", items: [], showOptions: true}

  @Output() deleteItemEvent: EventEmitter<any> = new EventEmitter();
  @Output() addItemEvent: EventEmitter<any> = new EventEmitter();
  @Output() editItemEvent: EventEmitter<any> = new EventEmitter();



  deleteList(id: number) {
    console.log("delete list with id: " + id)
  }

  editList(id: number) {
    console.log("edit list with id: " + id)
  }

  addItem() {
    console.log("add item")
    this.addItemEvent.emit()
  }

  editItem() {
    console.log("edit item")
    this.editItemEvent
  }

  deleteItem() {
    console.log("first event received, send second event")
    this.deleteItemEvent.emit()
  }

  constructor() { }

  ngOnInit(): void {
  }
}
