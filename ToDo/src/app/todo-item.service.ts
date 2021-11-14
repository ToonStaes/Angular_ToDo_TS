import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Todo_item } from './todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  private todo_items: Todo_item[] = [];


  constructor(private httpClient: HttpClient) {
  }

  getTodoItems(): Observable<Todo_item[]>{
    return this.httpClient.get<Todo_item[]>("http://localhost:3000/items")
  }

  getTodoItemById(id: number): Observable<Todo_item> {
    return this.httpClient.get<Todo_item>("http://localhost:3000/items?id=" + id)

  }

  getImportantItems(): Observable<Todo_item[]> {
    return this.httpClient.get<Todo_item[]>("http://localhost:3000/items?isImportant=true")

  }

  deleteItem(id: number): Observable<Todo_item> {
    return this.httpClient.delete<Todo_item>("http://localhost:3000/items/" + id);
  }

  postItem(item: Todo_item): Observable<Todo_item> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Todo_item>("http://localhost:3000/items", item, {headers: headers});
  }

  putItem(id: number, item: Todo_item): Observable<Todo_item> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Todo_item>("http://localhost:3000/items/" + id, item, {headers: headers});
  }
}
