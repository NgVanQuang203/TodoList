import {
  ADD_TODO,
  DELETEIMP_TODO,
  DELETE_TODO,
  EDIT_TODO,
  IMPORTANT_TODO,
  INDEXEDIT_TODO,
  PROGRESS_TODO,
  SET_TODO_INPUT,
} from './constants';
import storage from './storage';

const initState = {
  todos: storage.get(),
  todoInput: '',
  important: storage.getImportant(),
  progress: storage.getProgress(),
  editTodoIndex: null,
};
function reducer(state, action) {
  switch (action.type) {
    case SET_TODO_INPUT:
      return {
        ...state,
        todoInput: action.payload,
      };

    case ADD_TODO:
      return addTodo(state, action.payload);
    case DELETE_TODO:
      return deleteTodo(state, action.payload);
    case IMPORTANT_TODO:
      return moveImportant(state, action.payload);
    case DELETEIMP_TODO:
      return deleteImpTodo(state, action.payload);
    case PROGRESS_TODO:
      return {
        ...state,
        progress: action.payload,
      };
    case INDEXEDIT_TODO:
      return {
        ...state,
        editTodoIndex: action.payload,
      };
    case EDIT_TODO:
      return editTodo(state, action.title, action.payload);
    default:
      throw new Error('Invalid action type');
  }
}
// Add Todo
function addTodo(state, content) {
  const newTodo = {
    content: content,
    completed: false,
  };
  return {
    ...state,
    todos: [...state.todos, newTodo],
  };
}
// *Xóa Todo
function deleteTodo(state, index) {
  return {
    ...state,
    todos: state.todos.filter((_, i) => i !== index),
  };
}
//* Chuyển sang Important
function moveImportant(state, index) {
  const { content, completed } = state.todos[index];
  return {
    ...state,
    todos: state.todos.filter((_, i) => i !== index),
    important: [...state.important, { content, completed }],
  };
}
//*Xóa Important
function deleteImpTodo(state, index) {
  return {
    ...state,
    important: state.important.filter((_, i) => i !== index),
  };
}
function editTodo(state, title, payload) {
  if (title === 'Important') {
    if (state.editTodoIndex !== null && payload !== null) {
      // Tạo một bản sao mới của mảng todos để tránh thay đổi trực tiếp state
      const updatedTodosImp = [...state.important];
      // Cập nhật nội dung của todo tại vị trí được chỉ định
      updatedTodosImp[state.editTodoIndex].content = payload;
      return {
        ...state,
        important: updatedTodosImp, // Cập nhật mảng todos với nội dung mới
      };
    }
  } else {
    if (state.editTodoIndex !== null && payload !== null) {
      // Tạo một bản sao mới của mảng todos để tránh thay đổi trực tiếp state
      const updatedTodos = [...state.todos];
      // Cập nhật nội dung của todo tại vị trí được chỉ định
      updatedTodos[state.editTodoIndex].content = payload;
      return {
        ...state,
        todos: updatedTodos, // Cập nhật mảng todos với nội dung mới
      };
    }
  }
  return state;
}

export { initState };
export default reducer;
