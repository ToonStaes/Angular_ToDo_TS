export interface Todo_item {
  id: number;
  listId: number;
  description: string;
  date: string;
  isImportant: boolean;
  isFinished: boolean;
  deadline_approaching: boolean;
  order: number;
}