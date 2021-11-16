import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Todo_item } from '../todo-item';
import { TodoItemService } from '../todo-item.service';
import { Todo_list } from '../todo-list';
import { TodoListService } from '../todo-list.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todo_lists: Todo_list[] = [];
  todo_items: Todo_item[] = [];
  important_items: Todo_item[] = [];
  important_list!: Todo_list;
  subject: Subject<any> = new Subject();

  constructor(private todoListService: TodoListService, private todoItemService: TodoItemService) {

  }

  deleteItem(){
    this.getLists()
  }

  addItem(){
    this.getLists()
  }

  editItem(){
    this.getLists()
  }

  getLists(): void {
    this.todo_lists = []
    // Get important-items from DB and make important list
    this.todoItemService.getImportantItems().subscribe((importantItems) => {
      this.important_items = importantItems

      let important: Todo_list= {
        id: 1,
        name: "Important",
        category: "important",
        items: this.important_items,
        showOptions: false
      }

      if (important.items.length > 0){
        this.todo_lists.push(important)
      }
    })

    // Get all items, to make FinishedItems-list, PastDeadline-list and DeadlineApproaching-list
    this.todoItemService.getTodoItems().subscribe((todoItems) => {
      this.todo_items = todoItems

      var newDate: Date = new Date();
      var now = moment(newDate, "DD/MM/YYYY")
      var oneweek = moment(now, "DD/MM/YYYY").add(7, "days")

      var deadlineAppr_items: Todo_item[] = []
      var finished_items: Todo_item[] = []
      var pastDeadline_items: Todo_item[] = []

      this.todo_items.forEach(item => {
        var itemDate = moment(item.date, "DD/MM/YYYY")
        // check if finished
        if (item.isFinished){
          finished_items.push(item)
        }
        else {
          // Check if deadline has passed
          if ( now > itemDate && now.date() > itemDate.date()){
            pastDeadline_items.push(item)
          }
          else{
            // Check if deadline within one week
            if (itemDate <= oneweek){
              deadlineAppr_items.push(item)
            }
          }
        }
      })

      let deadlineApproaching: Todo_list = {
        id: 2,
        name: "Deadline approaching",
        category: "important",
        items: deadlineAppr_items,
        showOptions: false
      }

      let finished: Todo_list = {
        id: 3,
        name: "Done",
        category: "important",
        items: finished_items,
        showOptions: false
      }

      let pastDeadline: Todo_list = {
        id: 4,
        name: "Past deadline",
        category: "important",
        items: pastDeadline_items,
        showOptions: false
      }

      if (deadlineApproaching.items.length > 0) {
        this.todo_lists.push(deadlineApproaching)
      }
      if (finished.items.length > 0) {
        this.todo_lists.push(finished)
      }
      if (pastDeadline.items.length > 0) {
        this.todo_lists.push(pastDeadline)
      }

    })

    // Get prebuilt lists from DB
    this.todoListService.getTodoLists().subscribe((todoLists) => {
      // this.todo_lists = todoLists
      for (let listIndex in todoLists){
        this.todo_lists.push(todoLists[listIndex])
      }
    })
  }

  ngOnInit(): void {
    this.getLists()
  }
}
