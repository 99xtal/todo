export interface Todo {
  id: string;
  text: string;
  createdTime: number;
  completedTime: number | null;
}
