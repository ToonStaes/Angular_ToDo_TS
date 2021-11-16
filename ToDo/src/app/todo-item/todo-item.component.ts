import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatMenuTrigger } from '@angular/material/menu';
import { Todo_item } from '../todo-item';
import { Subscription } from 'rxjs';
import { TodoItemService } from '../todo-item.service';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, OnDestroy {
  @Input() todo_item: Todo_item = {id: 0, listId: 0, description: "", date: "", isImportant: false, isFinished: false}

  @Output() deleteItemEvent: EventEmitter<any> = new EventEmitter();

  deleteItem$: Subscription = new Subscription()

  constructor(private httpClient: HttpClient, private todoItemService: TodoItemService) { }

  deleteItem(id: number) {
    this.deleteItem$ = this.todoItemService.deleteItem(id).subscribe(result => {
      //all went well
      this.deleteItemEvent.emit()
    }, error => {
      //error
      console.log(error)
    });
  }

  editItem(id: number) {
    console.log("edit item with id: " + id)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.deleteItem$.unsubscribe()
  }

}
