import { ADD_TODO, COMPLETED_TODO, DELETEIMP_TODO, DELETE_TODO, EDIT_TODO, IMPORTANT_TODO, INDEXEDIT_TODO, PROGRESS_TODO, SET_TODO_INPUT } from "./constants";

export const setTodoInput = payload =>({
    type: SET_TODO_INPUT,
    payload
});

export const addTodo = payload =>({
    type: ADD_TODO,
    payload
});
export const delete_todo = payload =>({
    type: DELETE_TODO,
    payload
});
export const deleteimp_todo = payload =>({
    type: DELETEIMP_TODO,
    payload
});
export const important_todo = payload =>({
    type: IMPORTANT_TODO,
    payload
});
export const completed_todo = payload =>({
    type: COMPLETED_TODO,
    payload
});
export const progress_todo = payload =>({
    type: PROGRESS_TODO,
    payload
});
export const indexEdit_todo = payload =>({
    type: INDEXEDIT_TODO,
    payload
});
export const edit_todo = (title, payload) =>({
    type: EDIT_TODO,
    title,
    payload
});