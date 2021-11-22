import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo_list } from './todo-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  listAddedEvent: Subject<any> = new Subject<any>()
  title = 'ToDo';

  listAdded(list: Todo_list){
    this.listAddedEvent.next(list)
  }
}
