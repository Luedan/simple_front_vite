export interface Todo {
  id: number;
  task: string;
  status: "todo" | "in-progress" | "done";
}
