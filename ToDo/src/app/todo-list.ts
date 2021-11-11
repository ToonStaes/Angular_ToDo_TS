import { Todo_item } from "./todo-item";

export interface Todo_list {
  id: number;
  name: string;
  category: string;
  items: Array<Todo_item>;
  showOptions: boolean;
}