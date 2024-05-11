import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../../domain/todo";

interface TodoState {
  todos: Todo[];
  isUpdateActive: boolean;
  idToUpdate: number;
}

const initialState: TodoState = {
  todos: [],
  isUpdateActive: false,
  idToUpdate: 0,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    addTodos: (state, action) => {
      state.todos = action.payload;
    },
    removeTodo: (state, action) => {
      state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[index] = action.payload;
    },
    isUpdateActive: (state, action) => {
      state.isUpdateActive = action.payload.isActive;
      state.idToUpdate = action.payload.id
    },
  },
});

export const { addTodo, removeTodo, updateTodo, addTodos, isUpdateActive } = todoSlice.actions;

export default todoSlice.reducer;
