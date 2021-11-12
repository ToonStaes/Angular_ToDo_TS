import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {Subscription} from 'rxjs';
import { CallService } from '../call.service';
import { TodoItemService } from '../todo-item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  showModal: boolean = false;
  itemId: number = 0;

  isSubmitted: boolean = false;
  errorMessage: string = '';

  todo_item$: Subscription = new Subscription();
  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();
  subscription$: Subscription = new Subscription;

  // reactive form
  itemForm = new FormGroup({
    description: new FormControl(''),
    date: new FormControl('')
  });


  constructor(private todoItemService: TodoItemService, public Util: CallService) {
    // this.subscription$ = this.Util.getClickCall().subscribe(message => {
    //   console.log("message received: " + message)
    //   var messageComponents = message.split(",")
    //   var kindComponents = messageComponents[0].split(":")
    //   var kind = kindComponents[1]
    //   if (kind == "isAdd") {
    //     this.isAdd == true
    //   }
    //   else {
    //     this.isEdit == true
    //     var idComponents = messageComponents[1].split(":")
    //     var id = idComponents[1]
    //     this.itemId = id
    //   }
    // })

    // if (this.itemId != null && this.itemId > 0){
    //   this.todo_item$ = this.todoItemService.getTodoItemById(this.itemId).subscribe(result => {
    //     this.itemForm.setValue({
    //       description: result.description,
    //       date: moment(result.date, "DD/MM/YYYY").format("yyyy-MM-DD")
    //     })
    //   })
    // }

    // this.showModal = true
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.todo_item$.unsubscribe();
    this.postItem$.unsubscribe();
    this.putItem$.unsubscribe();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.showModal = false;
    if (this.isAdd) {
      this.postItem$ = this.todoItemService.postItem(this.itemForm.value).subscribe(result => {
        //all went well
        // DOEN: send event to parent to update lists
      },
      error => {
        this.errorMessage = error.message;
      });
    }

    if (this.isEdit) {
      this.putItem$ = this.todoItemService.putItem(this.itemId, this.itemForm.value).subscribe(result => {
                //all went well
                // DOEN: send event to parent to update lists
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }
}
