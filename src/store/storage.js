export default {
    get(){
        return JSON.parse(localStorage.getItem('TODOS')) || [];
    },
    set(todos){
        return localStorage.setItem('TODOS', JSON.stringify(todos));
    },
    getImportant(){
        return JSON.parse(localStorage.getItem('TODOS_IMPORTANT')) || [];
    },
    setImportant(todosImportant){
        return localStorage.setItem('TODOS_IMPORTANT', JSON.stringify(todosImportant));
    },
    getProgress(){
        return JSON.parse(localStorage.getItem('TODOS_PROGRESS')) || [];
    },
    setPROGRESS(todosImportant){
        return localStorage.setItem('TODOS_PROGRESS', JSON.stringify(todosImportant));
    },
}