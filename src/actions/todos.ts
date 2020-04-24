import { Dispatch } from 'redux';
let nextTodoId = 4;

export const addTodo = (text: string) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text: `${text}${nextTodoId + 1}`,
});

export const toggleTodo = (id: number) => ({
  type: 'TOGGLE_TODO',
  id,
});

export const asyncAdd = (text: string) => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(addTodo(text));
  }, 3000);
};
